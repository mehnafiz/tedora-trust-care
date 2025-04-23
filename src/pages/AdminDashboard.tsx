
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [caregivers, setCaregivers] = useState([
    { id: 1, name: "Nusrat Jahan", status: "active", specialty: "Childcare" },
    { id: 2, name: "Md. Rahman", status: "inactive", specialty: "Elderly Care" },
    { id: 3, name: "Ayesha Khan", status: "pending", specialty: "Overnight Care" },
    { id: 4, name: "Farhan Ahmed", status: "active", specialty: "Childcare" }
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const adminAuth = localStorage.getItem('tedora_admin');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === 'TEDora2024!') {
      localStorage.setItem('tedora_admin', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tedora_admin');
    setIsAuthenticated(false);
  };

  const approveCaregiver = (id: number) => {
    setCaregivers(caregivers.map(caregiver => 
      caregiver.id === id ? { ...caregiver, status: "active" } : caregiver
    ));
  };

  const rejectCaregiver = (id: number) => {
    setCaregivers(caregivers.map(caregiver => 
      caregiver.id === id ? { ...caregiver, status: "inactive" } : caregiver
    ));
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#6BA8A9]/10 to-[#FF9E7D]/10">
        <Card className="w-[350px] bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter password to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/')}>Cancel</Button>
            <Button onClick={handleLogin}>Login</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6BA8A9]/10 to-[#FF9E7D]/10 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/392329e6-0859-48e9-9da2-7918163f0ee5.png" 
              alt="TEDora+ Logo" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-[#6BA8A9]">TEDora+ Admin</h1>
              <p className="text-xs text-gray-500">Management Dashboard</p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleLogout}>Logout</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-normal text-gray-500">Total Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">28</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-normal text-gray-500">Active Caregivers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-normal text-gray-500">Pending Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">6</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-bold mb-4">Caregiver Management</h2>
        <Card className="bg-white/90 backdrop-blur-sm mb-8">
          <CardContent className="pt-6">
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead className="bg-[#6BA8A9] text-white">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Specialty</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {caregivers.map((caregiver) => (
                    <tr key={caregiver.id} className="border-t">
                      <td className="p-3">{caregiver.name}</td>
                      <td className="p-3">{caregiver.specialty}</td>
                      <td className="p-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          caregiver.status === 'active' ? 'bg-green-100 text-green-800' : 
                          caregiver.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {caregiver.status.charAt(0).toUpperCase() + caregiver.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="h-8 w-8 p-0 text-green-600" 
                            onClick={() => approveCaregiver(caregiver.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-600"
                            onClick={() => rejectCaregiver(caregiver.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
