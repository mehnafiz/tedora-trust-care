
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { Check, X, Calendar, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [caregivers, setCaregivers] = useState([
    { id: 1, name: "Nusrat Jahan", status: "active", specialty: "Childcare" },
    { id: 2, name: "Md. Rahman", status: "inactive", specialty: "Elderly Care" },
    { id: 3, name: "Ayesha Khan", status: "pending", specialty: "Overnight Care" },
    { id: 4, name: "Farhan Ahmed", status: "active", specialty: "Childcare" }
  ]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    email: '',
    name: '',
    role: ''
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const adminAuth = localStorage.getItem('tedora_admin');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
      fetchEmployees();
    }
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setEmployees(data || []);
    } catch (error: any) {
      console.error('Error fetching employees:', error.message);
      toast({
        title: 'Error',
        description: 'Failed to fetch employees data',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    if (password === 'TEDora2024!') {
      localStorage.setItem('tedora_admin', 'true');
      setIsAuthenticated(true);
      fetchEmployees();
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid administrator password",
        variant: "destructive"
      });
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

  const validateEmployee = async (id: string) => {
    try {
      const { error } = await supabase
        .from('employees')
        .update({ 
          is_validated: true,
          validated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Employee Validated",
        description: "The employee account has been validated successfully",
      });
      
      // Update local state
      fetchEmployees();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to validate employee",
        variant: "destructive"
      });
    }
  };

  const invalidateEmployee = async (id: string) => {
    try {
      const { error } = await supabase
        .from('employees')
        .update({ 
          is_validated: false,
          validated_at: null
        })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Employee Access Revoked",
        description: "The employee account has been invalidated",
      });
      
      // Update local state
      fetchEmployees();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to invalidate employee",
        variant: "destructive"
      });
    }
  };

  const createEmployeeAccount = async () => {
    if (!newEmployee.email || !newEmployee.name) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Generate a random password for the employee
      const tempPassword = Math.random().toString(36).slice(-8);
      
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: newEmployee.email,
        password: tempPassword,
        email_confirm: true
      });
      
      if (authError) throw authError;
      
      if (!authData.user) throw new Error("Failed to create user account");
      
      // Add employee to employees table
      const { error: employeeError } = await supabase
        .from('employees')
        .insert({
          user_id: authData.user.id,
          email: newEmployee.email,
          name: newEmployee.name,
          role: newEmployee.role || 'staff',
          is_validated: false
        });
      
      if (employeeError) throw employeeError;
      
      toast({
        title: "Employee Account Created",
        description: `Temporary password: ${tempPassword}`,
      });
      
      // Clear form and refresh data
      setNewEmployee({
        email: '',
        name: '',
        role: ''
      });
      fetchEmployees();
    } catch (error: any) {
      toast({
        title: "Error Creating Employee",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
              className="h-12 w-auto rounded-full"
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

        <Tabs defaultValue="caregivers" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="caregivers">Caregiver Management</TabsTrigger>
            <TabsTrigger value="employees">Employee Management</TabsTrigger>
            <TabsTrigger value="schedules">Work Schedules</TabsTrigger>
          </TabsList>
          
          <TabsContent value="caregivers">
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
          </TabsContent>
          
          <TabsContent value="employees">
            <div className="space-y-6">
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Create New Employee Account</CardTitle>
                  <CardDescription>Add new employees to the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="emp-email">Email</Label>
                      <Input 
                        id="emp-email" 
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                        placeholder="employee@tedora.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emp-name">Full Name</Label>
                      <Input 
                        id="emp-name" 
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                        placeholder="Employee Name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emp-role">Role</Label>
                      <Input 
                        id="emp-role" 
                        value={newEmployee.role}
                        onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})}
                        placeholder="e.g. Caregiver, Admin"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={createEmployeeAccount}
                    disabled={isLoading}
                    className="bg-[#6BA8A9] hover:bg-[#6BA8A9]/90"
                  >
                    {isLoading ? "Creating..." : "Create Employee"}
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Employee List</CardTitle>
                  <CardDescription>Manage employee access and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead className="bg-[#6BA8A9] text-white">
                        <tr>
                          <th className="p-3 text-left">Name</th>
                          <th className="p-3 text-left">Email</th>
                          <th className="p-3 text-left">Role</th>
                          <th className="p-3 text-left">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.map((employee) => (
                          <tr key={employee.id} className="border-t">
                            <td className="p-3">{employee.name || "No Name"}</td>
                            <td className="p-3">{employee.email}</td>
                            <td className="p-3">{employee.role || "Staff"}</td>
                            <td className="p-3">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                employee.is_validated ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {employee.is_validated ? "Validated" : "Pending"}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <div className="flex justify-end gap-2">
                                {!employee.is_validated ? (
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    className="h-8 w-8 p-0 text-green-600" 
                                    onClick={() => validateEmployee(employee.id)}
                                    title="Validate Employee"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                ) : (
                                  <Button 
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0 text-red-600"
                                    onClick={() => invalidateEmployee(employee.id)}
                                    title="Revoke Access"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
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
          </TabsContent>
          
          <TabsContent value="schedules">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Weekly Schedules</CardTitle>
                <CardDescription>Manage employee work schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">May 2023 - Week 1</h3>
                  <Button variant="outline" className="gap-2">
                    <Calendar size={16} /> Change Week
                  </Button>
                </div>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead className="bg-[#6BA8A9] text-white">
                      <tr>
                        <th className="p-3 text-left">Employee</th>
                        <th className="p-3 text-center">Mon</th>
                        <th className="p-3 text-center">Tue</th>
                        <th className="p-3 text-center">Wed</th>
                        <th className="p-3 text-center">Thu</th>
                        <th className="p-3 text-center">Fri</th>
                        <th className="p-3 text-center">Sat</th>
                        <th className="p-3 text-center">Sun</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3 font-medium">Nusrat Jahan</td>
                        <td className="p-3 text-center bg-green-50">9-5</td>
                        <td className="p-3 text-center bg-green-50">9-5</td>
                        <td className="p-3 text-center">OFF</td>
                        <td className="p-3 text-center bg-green-50">9-5</td>
                        <td className="p-3 text-center bg-green-50">9-5</td>
                        <td className="p-3 text-center">OFF</td>
                        <td className="p-3 text-center">OFF</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-medium">Md. Rahman</td>
                        <td className="p-3 text-center">OFF</td>
                        <td className="p-3 text-center bg-green-50">9-5</td>
                        <td className="p-3 text-center bg-green-50">9-5</td>
                        <td className="p-3 text-center bg-green-50">9-5</td>
                        <td className="p-3 text-center bg-green-50">9-5</td>
                        <td className="p-3 text-center bg-green-50">9-1</td>
                        <td className="p-3 text-center">OFF</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-medium">Ayesha Khan</td>
                        <td className="p-3 text-center bg-blue-50">6-10</td>
                        <td className="p-3 text-center bg-blue-50">6-10</td>
                        <td className="p-3 text-center bg-blue-50">6-10</td>
                        <td className="p-3 text-center">OFF</td>
                        <td className="p-3 text-center">OFF</td>
                        <td className="p-3 text-center bg-blue-50">6-10</td>
                        <td className="p-3 text-center bg-blue-50">6-10</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-medium">Farhan Ahmed</td>
                        <td className="p-3 text-center bg-green-50">9-5</td>
                        <td className="p-3 text-center bg-green-50">9-5</td>
                        <td className="p-3 text-center bg-green-50">9-5</td>
                        <td className="p-3 text-center bg-green-50">9-5</td>
                        <td className="p-3 text-center">OFF</td>
                        <td className="p-3 text-center">OFF</td>
                        <td className="p-3 text-center bg-blue-50">3-10</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
