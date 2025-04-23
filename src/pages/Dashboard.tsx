
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { CaregiverStats } from '@/components/dashboard/CaregiverStats';
import { ServiceRequestsTable } from '@/components/dashboard/ServiceRequestsTable';
import { ServicesCard } from '@/components/dashboard/ServicesCard';

interface CaregiverStats {
  total: number;
  available: number;
  booked: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<CaregiverStats>({
    total: 0,
    available: 0,
    booked: 0
  });
  const [serviceRequests, setServiceRequests] = useState<any[]>([]);
  
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        navigate('/login');
        return;
      }
    };

    const fetchStats = async () => {
      const { data: caregivers, error: caregiverError } = await supabase
        .from('caregivers')
        .select('*');

      if (caregiverError) {
        console.error('Error fetching caregivers:', caregiverError);
        return;
      }

      const available = caregivers?.filter(c => c.availability).length || 0;
      setStats({
        total: caregivers?.length || 0,
        available: available,
        booked: (caregivers?.length || 0) - available
      });
    };

    const fetchServiceRequests = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: requests, error } = await supabase
        .from('service_requests')
        .select(`
          *,
          caregivers (
            name,
            specialization
          )
        `)
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching service requests:', error);
        return;
      }

      setServiceRequests(requests || []);
    };

    checkUser();
    fetchStats();
    fetchServiceRequests();
  }, [navigate]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6BA8A9]/10 to-[#FF9E7D]/10 p-4">
      <div className="container mx-auto">
        <DashboardHeader />
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
                  <Button className="mt-4 bg-[#FF9E7D] hover:bg-[#FF9E7D]/90">
                    Book Your First Service
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <ServicesCard services={services} />
      </div>
    </div>
  );
};

export default Dashboard;
