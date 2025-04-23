
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserCheck, LogOut, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface User {
  role: string;
  name: string;
  phone: string;
}

interface CaregiverStats {
  total: number;
  available: number;
  booked: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
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

      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        return;
      }

      setUser(profile);
    };

    const fetchStats = async () => {
      // Fetch caregiver stats
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

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
        {/* Header with logout */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/392329e6-0859-48e9-9da2-7918163f0ee5.png" 
              alt="TEDora+ Logo" 
              className="h-12 w-auto"
            />
            <span className="text-xl font-bold text-[#6BA8A9]">TEDora+</span>
          </Link>
          <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={16} />
            <span>Log out</span>
          </Button>
        </div>
        
        {/* Welcome Card with Stats */}
        <Card className="mb-6 bg-white/90 backdrop-blur-sm border border-[#6BA8A9]/20">
          <CardHeader>
            <CardTitle className="text-2xl font-montserrat">Welcome, {user.name}!</CardTitle>
            <CardDescription>
              Current Caregiver Availability Status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-4 bg-[#6BA8A9]/10 rounded-lg">
                <p className="text-2xl font-bold text-[#6BA8A9]">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Caregivers</p>
              </div>
              <div className="text-center p-4 bg-green-100 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{stats.available}</p>
                <p className="text-sm text-gray-600">Available Now</p>
              </div>
              <div className="text-center p-4 bg-orange-100 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{stats.booked}</p>
                <p className="text-sm text-gray-600">Currently Booked</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Requests Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-montserrat font-bold">Your Service Requests</h2>
          {serviceRequests.length > 0 ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-[#6BA8A9]/20">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Type</TableHead>
                    <TableHead>Care Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serviceRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.service_type}</TableCell>
                      <TableCell className="capitalize">{request.care_type}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          request.status === 'approved' ? 'bg-green-100 text-green-800' :
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          request.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {request.status}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(request.start_time).toLocaleString()}</TableCell>
                      <TableCell>{request.duration_hours} hours</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <Card className="bg-white/90 backdrop-blur-sm border border-[#6BA8A9]/20">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Clock className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-gray-500">No service requests found</p>
                  <Button className="mt-4 bg-[#FF9E7D] hover:bg-[#FF9E7D]/90">Book Your First Service</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
