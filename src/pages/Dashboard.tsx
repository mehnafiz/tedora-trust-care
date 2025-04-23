
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserCheck, LogOut, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface User {
  role: string;
  name: string;
  phone: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('tedora_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('tedora_user');
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
        
        {/* Welcome Card */}
        <Card className="mb-6 bg-white/90 backdrop-blur-sm border border-[#6BA8A9]/20">
          <CardHeader>
            <CardTitle className="text-2xl font-montserrat">Welcome, {user.name}!</CardTitle>
            <CardDescription>
              {user.role === 'client' 
                ? 'Manage your care services and bookings' 
                : 'Access your caregiver assignments and schedule'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="bg-[#6BA8A9]/20 p-3 rounded-full">
                <UserCheck size={24} className="text-[#6BA8A9]" />
              </div>
              <div>
                <p className="font-medium">{user.role === 'client' ? 'Family Account' : 'Caregiver Account'}</p>
                <p className="text-sm text-gray-500">{user.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {user.role === 'client' ? (
          <>
            {/* Service Booking for Clients */}
            <h2 className="text-xl font-montserrat font-bold mb-4">Book a Service</h2>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-[#6BA8A9]/20 mb-6">
              <Table>
                <TableHeader className="bg-[#6BA8A9] text-white">
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Time Slot</TableHead>
                    <TableHead>Price (৳)</TableHead>
                    <TableHead className="text-right">Book</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service, index) => (
                    <TableRow 
                      key={index} 
                      className="transition-all hover:bg-[#FF9E7D]/10"
                    >
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell>{service.timeSlot}</TableCell>
                      <TableCell>{service.price}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost">
                          <Calendar size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Previous Bookings */}
            <h2 className="text-xl font-montserrat font-bold mb-4">Your Bookings</h2>
            <Card className="bg-white/90 backdrop-blur-sm border border-[#6BA8A9]/20">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Clock className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-gray-500">No bookings found</p>
                  <Button className="mt-4 bg-[#FF9E7D] hover:bg-[#FF9E7D]/90">Book Your First Service</Button>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Caregiver Schedule */}
            <h2 className="text-xl font-montserrat font-bold mb-4">Your Assignments</h2>
            <Card className="bg-white/90 backdrop-blur-sm border border-[#6BA8A9]/20 mb-6">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-[#6BA8A9]/10 rounded-lg">
                    <div>
                      <p className="font-medium">Elderly Care</p>
                      <p className="text-sm text-gray-600">Gulshan, Dhaka</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#6BA8A9] font-medium">Apr 24, 2025</p>
                      <p className="text-sm">8:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-[#6BA8A9]/10 rounded-lg">
                    <div>
                      <p className="font-medium">Overnight Care</p>
                      <p className="text-sm text-gray-600">Banani, Dhaka</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#6BA8A9] font-medium">Apr 25, 2025</p>
                      <p className="text-sm">10:00 PM - 6:00 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Full Schedule</Button>
              </CardFooter>
            </Card>
            
            {/* Caregiver Stats */}
            <h2 className="text-xl font-montserrat font-bold mb-4">Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white/90 backdrop-blur-sm border border-[#6BA8A9]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-normal text-gray-500">Completed Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">24</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm border border-[#6BA8A9]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-normal text-gray-500">Client Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">4.8/5</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm border border-[#6BA8A9]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-normal text-gray-500">Hours Worked</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">127</p>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
