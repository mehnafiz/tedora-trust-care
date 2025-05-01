import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, AlertCircle } from 'lucide-react';
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
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (!session) {
          navigate('/login');
          return;
        }
        
        await fetchData(session.user.id);
      } catch (error) {
        console.error('Error checking user session:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    if (!roleLoading) {
      if (!isClient && !isEmployee) {
        // If not a client or employee, redirect to login
        navigate('/login');
      } else if (user) {
        fetchData(user.id);
        setLoading(false);
      }
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate('/login');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, roleLoading, isClient, isEmployee, user]);

  const fetchData = async (userId: string) => {
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
      if (isClient) {
        const { data: requests, error: requestError } = await supabase
          .from('service_requests')
          .select(`
            *,
            caregivers (
              name,
              specialization
            )
          `)
          .eq('user_id', userId)
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
      }
    } catch (error) {
      console.error('Error in fetchData:', error);
      toast({
        title: "Error",
        description: "Something went wrong while loading your dashboard",
        variant: "destructive"
      });
    }
  };

  const handleBookService = (serviceName: string) => {
    navigate('/book-service', { state: { serviceName } });
  };

  // Updated services with BDT currency format
  const services = [
    {
      name: "Hourly Babysitting",
      timeSlot: "7 AM – 6 PM",
      price: "249"
    },
    {
      name: "Hourly Babysitting(Night)",
      timeSlot: "6 PM – 10 PM",
      price: "299"
    },
    {
      name: "Full-Day Childcare",
      timeSlot: "8 AM – 6 PM",
      price: "1,499"
    },
    {
      name: "Overnight Care",
      timeSlot: "10 PM – 6 AM",
      price: "1,999"
    },
    {
      name: "Elderly Care (Daily)",
      timeSlot: "8 AM – 8 PM",
      price: "1,799"
    }
  ];

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#6BA8A9]/10 to-[#FF9E7D]/10 p-4 flex items-center justify-center">
        <p className="text-lg">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6BA8A9]/10 to-[#FF9E7D]/10 p-4">
      <div className="container mx-auto">
        <DashboardHeader />
        
        {isClient ? (
          // Client Dashboard Content
          <>
            <CaregiverStats stats={stats} />
            
            <div className="space-y-6">
              <h2 className="text-xl font-montserrat font-bold">Your Service Requests</h2>
              {serviceRequests.length > 0 ? (
                <ServiceRequestsTable serviceRequests={serviceRequests} />
              ) : (
                <Card className="bg-white/90 backdrop-blur-sm border border-[#6BA8A9]/20">
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <Clock className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-gray-500">No service requests found</p>
                      <Button 
                        className="mt-4 bg-[#FF9E7D] hover:bg-[#FF9E7D]/90"
                        onClick={() => navigate('/book-service')}
                      >
                        Book Your First Service
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-montserrat font-bold">Available Services</h2>
              <ServicesCard services={services} onBookService={handleBookService} />
            </div>
          </>
        ) : isEmployee ? (
          // Employee Dashboard Content
          <div className="space-y-6 mt-8">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Employee Dashboard</AlertTitle>
              <AlertDescription>
                Welcome to the employee dashboard. You are logged in as a TEDora+ employee.
              </AlertDescription>
            </Alert>
            
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h2 className="text-xl font-montserrat font-bold mb-4">Employee Portal</h2>
                <p className="text-gray-700 mb-4">
                  As a TEDora+ employee, you have access to team information and resources.
                </p>
                <Button 
                  className="bg-[#6BA8A9] hover:bg-[#6BA8A9]/90"
                  onClick={() => window.location.href = '/#team'}
                >
                  View Team Section
                </Button>
              </CardContent>
            </Card>
            
            <CaregiverStats stats={stats} />
          </div>
        ) : (
          // Fallback content (should not normally be reached due to redirect)
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
      </div>
    </div>
  );
};

export default Dashboard;
