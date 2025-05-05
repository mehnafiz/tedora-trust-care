import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, Star, CreditCard, MessageCircle, Check, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { ServicesCard } from '@/components/dashboard/ServicesCard';
import { useToast } from '@/components/ui/use-toast';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface CaregiverStats {
  total: number;
  available: number;
  booked: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isClient, isEmployee, isLoading: roleLoading, user } = useRoleCheck();
  const [stats, setStats] = useState<CaregiverStats>({
    total: 0,
    available: 0,
    booked: 0
  });
  const [serviceRequests, setServiceRequests] = useState<any[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        // Fetch caregiver stats
        const { data: caregivers, error: caregiverError } = await supabase
          .from('caregivers')
          .select('*');

        if (caregiverError) {
          console.error('Error fetching caregivers:', caregiverError);
          toast({
            title: "Error",
            description: "Failed to load caregiver data",
            variant: "destructive"
          });
          return;
        }

        const available = caregivers?.filter(c => c.availability).length || 0;
        setStats({
          total: caregivers?.length || 0,
          available: available,
          booked: (caregivers?.length || 0) - available
        });

        // Fetch service requests for the user (only for clients)
        if (isClient && user) {
          const { data: requests, error: requestError } = await supabase
            .from('service_requests')
            .select(`
              *,
              caregivers (
                name,
                specialization
              )
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (requestError) {
            console.error('Error fetching service requests:', requestError);
            toast({
              title: "Error",
              description: "Failed to load your service requests",
              variant: "destructive"
            });
            return;
          }

          setServiceRequests(requests || []);
          
          // Upcoming appointments (those with status "confirmed" and future date)
          const upcoming = (requests || [])
            .filter(req => req.status === "confirmed" && new Date(req.start_time) > new Date())
            .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
            .slice(0, 3); // Get the next 3 appointments
            
          setUpcomingAppointments(upcoming);
        }
        
        // For employees, fetch their assigned service requests
        if (isEmployee && user) {
          // This would need to be implemented with proper relation between employees and caregivers
          // For now, we'll use sample data for display purposes
          const sampleAssignments = [
            {
              id: 'emp-1',
              client_name: 'Ahmed Family',
              service_type: 'Childcare',
              start_time: new Date().setHours(new Date().getHours() + 2),
              status: 'confirmed',
              location: 'Gulshan, Dhaka'
            }
          ];
          
          setServiceRequests(sampleAssignments);
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
        toast({
          title: "Error",
          description: "Something went wrong while loading your dashboard",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (!roleLoading && user) {
      fetchData();
    } else if (!roleLoading && !user) {
      navigate('/login');
    }
  }, [user, isClient, isEmployee, roleLoading, navigate, toast]);

  const handleBookService = (serviceName: string) => {
    if (isClient) {
      navigate('/book-service', { state: { serviceName } });
    } else {
      window.location.href = "tel:+8801772322383";
    }
  };

  const handleServiceComplete = (requestId: string) => {
    // Mark service as complete and remove from list
    setServiceRequests(prev => prev.filter(req => req.id !== requestId));
    toast({
      title: "Service Completed",
      description: "The service has been marked as completed",
    });
  };

  // Updated services with new pricing
  const services = [
    {
      name: "Daytime Care",
      timeSlot: "7 AM – 6 PM",
      price: "249"
    },
    {
      name: "Evening Care 🌙",
      timeSlot: "6 PM – 10 PM",
      price: "349"
    },
    {
      name: "Full-Day Childcare",
      timeSlot: "8 AM – 6 PM",
      price: "999"
    },
    {
      name: "Overnight Care",
      timeSlot: "10 PM – 6 AM",
      price: "1,299"
    },
    {
      name: "Elderly Care",
      timeSlot: "8 AM – 8 PM",
      price: "1,199"
    },
    {
      name: "Weekend Package",
      timeSlot: "Fri + Sat (Hourly)",
      price: "399"
    }
  ];

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#6BA8A9]/10 to-[#FF9E7D]/10 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-tedora-sage border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-slate-700">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Client Dashboard Content
  const renderClientDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-[#6BA8A9]/10 to-white border border-slate-200 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Upcoming Services</h3>
                <p className="text-2xl font-bold mt-2">{upcomingAppointments.length}</p>
              </div>
              <div className="p-3 bg-[#6BA8A9]/20 rounded-full">
                <Calendar className="h-6 w-6 text-[#6BA8A9]" />
              </div>
            </div>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full border-[#6BA8A9] text-[#6BA8A9] hover:bg-[#6BA8A9]/10"
                onClick={() => navigate('/book-service')}
              >
                Book New Service
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-[#FF9E7D]/10 to-white border border-slate-200 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Contact Us</h3>
                <p className="text-xl font-bold mt-2">+8801772322383</p>
              </div>
              <div className="p-3 bg-[#FF9E7D]/20 rounded-full">
                <PhoneCall className="h-6 w-6 text-[#FF9E7D]" />
              </div>
            </div>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full border-[#FF9E7D] text-[#FF9E7D] hover:bg-[#FF9E7D]/10"
                onClick={() => window.location.href = "tel:+8801772322383"}
              >
                Call Now
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-tedora-peach/10 to-white border border-slate-200 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Service Rating</h3>
                <div className="flex items-center mt-2">
                  <p className="text-2xl font-bold">4.9</p>
                  <div className="flex items-center ml-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-3 bg-tedora-peach/20 rounded-full">
                <Star className="h-6 w-6 text-tedora-peach" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Based on your previous bookings
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming Appointments */}
      <h2 className="text-xl font-montserrat font-bold mb-4">Upcoming Appointments</h2>
      {upcomingAppointments.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 mb-8">
          {upcomingAppointments.map((appointment) => (
            <Card key={appointment.id} className="border-l-4 border-tedora-sage overflow-hidden hover:shadow-md transition-all">
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-tedora-sage/10 rounded-full">
                    <Calendar className="h-5 w-5 text-tedora-sage" />
                  </div>
                  <div>
                    <h3 className="font-medium">{appointment.service_type}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(appointment.start_time).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })} at {new Date(appointment.start_time).toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <div className="text-right mr-4 hidden sm:block">
                    <p className="text-sm font-medium">{appointment.caregivers?.name || 'Caregiver'}</p>
                    <p className="text-xs text-gray-500">{appointment.caregivers?.specialization || 'Specialist'}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-tedora-sage text-tedora-sage hover:bg-tedora-sage/10"
                    onClick={() => handleServiceComplete(appointment.id)}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Mark Complete
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-slate-300 hover:bg-slate-50"
                    onClick={() => navigate(`/book-service?id=${appointment.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="mb-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <div className="bg-slate-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-lg font-medium text-slate-700">No upcoming appointments</p>
              <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
                Book your first TEDora+ service today and experience premium care at your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  className="bg-tedora-sage hover:bg-tedora-sage/90 text-white"
                  onClick={() => navigate('/book-service')}
                >
                  Book Your First Service
                </Button>
                <Button 
                  variant="outline"
                  className="border-tedora-peach text-tedora-peach hover:bg-tedora-peach/10"
                  onClick={() => window.location.href = "tel:+8801772322383"}
                >
                  <PhoneCall className="h-4 w-4 mr-1" />
                  Call For Assistance
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-6">
        <h2 className="text-xl font-montserrat font-bold">Your Service Requests</h2>
        {serviceRequests.length > 0 ? (
          <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {serviceRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{request.service_type}</div>
                      <div className="text-sm text-gray-500 capitalize">{request.care_type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === 'approved' || request.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(request.start_time).toLocaleDateString()} at {new Date(request.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-tedora-sage text-tedora-sage hover:bg-tedora-sage/10"
                          onClick={() => handleServiceComplete(request.id)}
                        >
                          <Check className="h-3 w-3 mr-1" /> 
                          Complete
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-slate-300 hover:bg-slate-50"
                          onClick={() => navigate(`/book-service?id=${request.id}`)}
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Clock className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-gray-500">No service requests found</p>
                <Button 
                  className="mt-4 bg-tedora-peach hover:bg-tedora-peach/90 text-white"
                  onClick={() => navigate('/book-service')}
                >
                  Book Your First Service
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-montserrat font-bold">Available Services</h2>
        <p className="text-gray-500 mt-1 mb-4">
          For the fastest service, call us directly at <a href="tel:+8801772322383" className="text-tedora-sage font-medium">+8801772322383</a>
        </p>
        <ServicesCard services={services} onBookService={handleBookService} />
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-tedora-sage to-tedora-peach p-3 text-white text-center shadow-lg z-30">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm font-medium hidden sm:block">For the fastest service, call us directly!</p>
          <Button 
            variant="secondary" 
            className="bg-white text-tedora-sage hover:bg-white/90"
            onClick={() => window.location.href = "tel:+8801772322383"}
          >
            <PhoneCall className="h-4 w-4 mr-1" />
            Call Now: +8801772322383
          </Button>
        </div>
      </div>
    </>
  );

  // Employee Dashboard Content
  const renderEmployeeDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-[#6BA8A9]/10 to-white border border-slate-200 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Today's Assignments</h3>
                <p className="text-2xl font-bold mt-2">1</p>
              </div>
              <div className="p-3 bg-[#6BA8A9]/20 rounded-full">
                <Calendar className="h-6 w-6 text-[#6BA8A9]" />
              </div>
            </div>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full border-[#6BA8A9] text-[#6BA8A9] hover:bg-[#6BA8A9]/10"
                onClick={() => navigate('/schedule')}
              >
                View Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-[#FF9E7D]/10 to-white border border-slate-200 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Contact Office</h3>
                <p className="text-xl font-bold mt-2">+8801772322383</p>
              </div>
              <div className="p-3 bg-[#FF9E7D]/20 rounded-full">
                <PhoneCall className="h-6 w-6 text-[#FF9E7D]" />
              </div>
            </div>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full border-[#FF9E7D] text-[#FF9E7D] hover:bg-[#FF9E7D]/10"
                onClick={() => window.location.href = "tel:+8801772322383"}
              >
                Call Now
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-tedora-peach/10 to-white border border-slate-200 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Performance Rating</h3>
                <div className="flex items-center mt-2">
                  <p className="text-2xl font-bold">5.0</p>
                  <div className="flex items-center ml-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-3 bg-tedora-peach/20 rounded-full">
                <Star className="h-6 w-6 text-tedora-peach" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Based on client feedback
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Employee's Schedule */}
      <h2 className="text-xl font-montserrat font-bold mb-4">Today's Schedule</h2>
      <Card className="mb-8 border border-slate-200 shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="border-l-4 border-tedora-sage p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-tedora-sage/10 rounded-full">
                <Calendar className="h-5 w-5 text-tedora-sage" />
              </div>
              <div>
                <h3 className="font-medium">Childcare Service</h3>
                <p className="text-sm text-gray-500">Today at 2:00 PM - 6:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right mr-4 hidden sm:block">
                <p className="text-sm font-medium">Ahmed Family</p>
                <p className="text-xs text-gray-500">Gulshan, Dhaka</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-tedora-sage text-tedora-sage hover:bg-tedora-sage/10"
                onClick={() => navigate('/schedule')}
              >
                <Check className="h-4 w-4 mr-1" />
                Mark Complete
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-slate-300 hover:bg-slate-50"
                onClick={() => navigate('/schedule')}
              >
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Alert className="mb-8 border border-tedora-sage/30 bg-tedora-sage/5">
        <AlertTitle className="text-tedora-sage">Employee Portal</AlertTitle>
        <AlertDescription>
          Welcome to the TEDora+ employee portal. For assistance with your schedule, payroll or time off, please call us directly at <a href="tel:+8801772322383" className="text-tedora-sage font-medium">+8801772322383</a>
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-slate-200 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <h3 className="font-medium text-gray-700 mb-4">Important Information</h3>
            <div className="space-y-2">
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center">
                  <div className="text-amber-600 mr-3">
                    <PhoneCall size={20} />
                  </div>
                  <div>
                    <p className="text-amber-800 font-medium">Contact Office</p>
                    <p className="text-amber-700 text-sm">Always call office before and after assignments</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center">
                  <div className="text-blue-600 mr-3">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="text-blue-800 font-medium">Service Updates</p>
                    <p className="text-blue-700 text-sm">Report any issues immediately to the office</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <div className="text-green-600 mr-3">
                    <Check size={20} />
                  </div>
                  <div>
                    <p className="text-green-800 font-medium">Attendance</p>
                    <p className="text-green-700 text-sm">Always be punctual for your assignments</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-slate-200 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <h3 className="font-medium text-gray-700 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="border-tedora-sage text-tedora-sage hover:bg-tedora-sage/10 h-auto py-4 flex flex-col"
                onClick={() => navigate('/schedule')}
              >
                <Calendar size={24} className="mb-2" />
                <span>View Schedule</span>
              </Button>
              <Button 
                variant="outline" 
                className="border-tedora-peach text-tedora-peach hover:bg-tedora-peach/10 h-auto py-4 flex flex-col"
                onClick={() => navigate('/leave-requests')}
              >
                <Clock size={24} className="mb-2" />
                <span>Leave Request</span>
              </Button>
              <Button 
                variant="outline" 
                className="border-blue-500 text-blue-500 hover:bg-blue-500/10 h-auto py-4 flex flex-col"
                onClick={() => navigate('/reports')}
              >
                <MessageCircle size={24} className="mb-2" />
                <span>Submit Report</span>
              </Button>
              <Button 
                variant="outline" 
                className="border-amber-500 text-amber-500 hover:bg-amber-500/10 h-auto py-4 flex flex-col"
                onClick={() => window.location.href = "tel:+8801772322383"}
              >
                <PhoneCall size={24} className="mb-2" />
                <span>Call Office</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-tedora-sage to-tedora-peach p-3 text-white text-center shadow-lg z-30">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm font-medium hidden sm:block">Need assistance with your schedule or assignments?</p>
          <Button 
            variant="secondary" 
            className="bg-white text-tedora-sage hover:bg-white/90"
            onClick={() => window.location.href = "tel:+8801772322383"}
          >
            <PhoneCall className="h-4 w-4 mr-1" />
            Call Office: +8801772322383
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <DashboardLayout>
      {isClient ? (
        // Client Dashboard
        renderClientDashboard()
      ) : isEmployee ? (
        // Employee Dashboard
        renderEmployeeDashboard()
      ) : (
        // Fallback (should not reach here due to ProtectedRoute)
        <div className="text-center py-12">
          <p className="text-lg text-red-500">Access denied. Please log in with the correct credentials.</p>
          <Button 
            className="mt-4"
            variant="outline"
            onClick={() => navigate('/login')}
          >
            Return to Login
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
