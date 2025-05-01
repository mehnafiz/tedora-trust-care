
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, AlertCircle, Star, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { CaregiverStats } from '@/components/dashboard/CaregiverStats';
import { ServiceRequestsTable } from '@/components/dashboard/ServiceRequestsTable';
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
          // For now, we'll leave this as a placeholder
          
          // TODO: Fetch employee's assigned service requests
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
    navigate('/book-service', { state: { serviceName } });
  };

  // Updated services with BDT currency format
  const services = [
    {
      name: "Hourly Babysitting",
      timeSlot: "7 AM – 6 PM",
      price: "৳249"
    },
    {
      name: "Hourly Babysitting (Night)",
      timeSlot: "6 PM – 10 PM",
      price: "৳299"
    },
    {
      name: "Full-Day Childcare",
      timeSlot: "8 AM – 6 PM",
      price: "৳1,499"
    },
    {
      name: "Overnight Care",
      timeSlot: "10 PM – 6 AM",
      price: "৳1,999"
    },
    {
      name: "Elderly Care (Daily)",
      timeSlot: "8 AM – 8 PM",
      price: "৳1,799"
    }
  ];

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#6BA8A9]/10 to-[#FF9E7D]/10 p-4 flex items-center justify-center">
        <p className="text-lg">Loading your dashboard...</p>
      </div>
    );
  }

  // Client Dashboard Content
  const renderClientDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-[#6BA8A9]/10 to-white">
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
        
        <Card className="bg-gradient-to-br from-[#FF9E7D]/10 to-white">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Outstanding Balance</h3>
                <p className="text-2xl font-bold mt-2">৳0.00</p>
              </div>
              <div className="p-3 bg-[#FF9E7D]/20 rounded-full">
                <CreditCard className="h-6 w-6 text-[#FF9E7D]" />
              </div>
            </div>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full border-[#FF9E7D] text-[#FF9E7D] hover:bg-[#FF9E7D]/10"
                onClick={() => navigate('/invoices')}
              >
                View Invoices
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-tedora-peach/10 to-white">
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
            <Card key={appointment.id} className="border-l-4 border-tedora-sage overflow-hidden">
              <CardContent className="p-4 flex items-center justify-between">
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
                <div className="flex items-center gap-2">
                  <div className="text-right mr-4">
                    <p className="text-sm font-medium">{appointment.caregivers?.name || 'Caregiver'}</p>
                    <p className="text-xs text-gray-500">{appointment.caregivers?.specialization || 'Specialist'}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/book-service?id=${appointment.id}`)}>
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Calendar className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-gray-500">No upcoming appointments</p>
              <Button 
                className="mt-4 bg-tedora-sage hover:bg-tedora-sage/90"
                onClick={() => navigate('/book-service')}
              >
                Book Your First Service
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-6">
        <h2 className="text-xl font-montserrat font-bold">Your Service Requests</h2>
        {serviceRequests.length > 0 ? (
          <ServiceRequestsTable serviceRequests={serviceRequests} />
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Clock className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-gray-500">No service requests found</p>
                <Button 
                  className="mt-4 bg-tedora-peach hover:bg-tedora-peach/90"
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
        <ServicesCard services={services} onBookService={handleBookService} />
      </div>
    </>
  );

  // Employee Dashboard Content
  const renderEmployeeDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-[#6BA8A9]/10 to-white">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Today's Assignments</h3>
                <p className="text-2xl font-bold mt-2">0</p>
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
        
        <Card className="bg-gradient-to-br from-[#FF9E7D]/10 to-white">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Hours This Week</h3>
                <p className="text-2xl font-bold mt-2">0</p>
              </div>
              <div className="p-3 bg-[#FF9E7D]/20 rounded-full">
                <Clock className="h-6 w-6 text-[#FF9E7D]" />
              </div>
            </div>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full border-[#FF9E7D] text-[#FF9E7D] hover:bg-[#FF9E7D]/10"
                onClick={() => navigate('/payroll')}
              >
                View Payroll
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-tedora-peach/10 to-white">
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
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Calendar className="mx-auto text-gray-400 mb-2" size={32} />
            <p className="text-gray-500">No assignments scheduled for today</p>
            <Button 
              className="mt-4 bg-tedora-sage hover:bg-tedora-sage/90"
              onClick={() => navigate('/schedule')}
            >
              View Full Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Alert className="mb-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Employee Portal</AlertTitle>
        <AlertDescription>
          Welcome to the TEDora+ employee portal. Here you can access your schedule, submit reports, and manage your work.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium text-gray-700 mb-4">Recent Reports</h3>
            <div className="text-center py-8">
              <FileText className="mx-auto text-gray-400 mb-2" size={24} />
              <p className="text-gray-500">No reports submitted yet</p>
              <Button 
                className="mt-4 bg-tedora-sage/90 hover:bg-tedora-sage text-white"
                size="sm"
                onClick={() => navigate('/reports')}
              >
                Submit Report
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium text-gray-700 mb-4">Messages</h3>
            <div className="text-center py-8">
              <MessageCircle className="mx-auto text-gray-400 mb-2" size={24} />
              <p className="text-gray-500">No new messages</p>
              <Button 
                className="mt-4 bg-tedora-sage/90 hover:bg-tedora-sage text-white"
                size="sm"
                onClick={() => navigate('/chat')}
              >
                Open Chat
              </Button>
            </div>
          </CardContent>
        </Card>
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
