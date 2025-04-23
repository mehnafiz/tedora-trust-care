
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

const BookService = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    service_type: state?.serviceName || '',
    care_type: '',
    address: '',
    time: '',
    duration_hours: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        toast({
          title: "Authentication required",
          description: "Please login to book a service",
          variant: "destructive"
        });
        navigate('/login');
        return;
      }
      
      setUser(session.user);
      setIsAuthenticated(true);
      
      // Try to load user profile address
      if (session.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('address')
          .eq('id', session.user.id)
          .single();
          
        if (profile?.address) {
          setFormData(prev => ({ ...prev, address: profile.address }));
        }
      }
    };
    
    checkAuth();
  }, [navigate, toast]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast({
        title: "Date required",
        description: "Please select a date for your service",
        variant: "destructive"
      });
      return;
    }
    
    // Validation
    if (!formData.service_type || !formData.care_type || !formData.address || 
        !formData.time || !formData.duration_hours) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Combine date and time
      const [hours, minutes] = formData.time.split(':').map(Number);
      const startTime = new Date(date);
      startTime.setHours(hours, minutes);
      
      const { error } = await supabase
        .from('service_requests')
        .insert({
          user_id: user.id,
          service_type: formData.service_type,
          care_type: formData.care_type,
          address: formData.address,
          start_time: startTime.toISOString(),
          duration_hours: parseInt(formData.duration_hours),
          notes: formData.notes || null
        });
        
      if (error) throw error;
      
      toast({
        title: "Service booked successfully!",
        description: "We'll process your request and confirm shortly.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error booking service:', error);
      toast({
        title: "Booking failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  if (!isAuthenticated) {
    return <div className="p-8 text-center">Checking authentication...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6BA8A9]/10 to-[#FF9E7D]/10 p-4">
      <div className="container mx-auto">
        <DashboardHeader />
        
        <Card className="max-w-2xl mx-auto mt-8 bg-white/90 backdrop-blur-sm border border-[#6BA8A9]/20">
          <CardHeader>
            <CardTitle className="text-2xl font-montserrat">Book a Service</CardTitle>
            <CardDescription>
              Fill out the form below to request care services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="service_type">Service Type</Label>
                  <Select 
                    value={formData.service_type} 
                    onValueChange={(value) => handleSelectChange('service_type', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hourly Babysitting">Hourly Babysitting</SelectItem>
                      <SelectItem value="Hourly Babysitting(Night)">Hourly Babysitting (Night)</SelectItem>
                      <SelectItem value="Full-Day Childcare">Full-Day Childcare</SelectItem>
                      <SelectItem value="Overnight Care">Overnight Care</SelectItem>
                      <SelectItem value="Elderly Care (Daily)">Elderly Care (Daily)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="care_type">Care Type</Label>
                  <Select 
                    value={formData.care_type} 
                    onValueChange={(value) => handleSelectChange('care_type', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select care type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baby">Baby Care</SelectItem>
                      <SelectItem value="elderly">Elderly Care</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    placeholder="Service location address"
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <div className="flex items-center mt-2">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="time" 
                        name="time" 
                        type="time" 
                        value={formData.time} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="duration_hours">Duration (hours)</Label>
                  <Input 
                    id="duration_hours" 
                    name="duration_hours"
                    type="number" 
                    min="1"
                    value={formData.duration_hours} 
                    onChange={handleInputChange} 
                    placeholder="Number of hours"
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea 
                    id="notes" 
                    name="notes" 
                    value={formData.notes} 
                    onChange={handleInputChange} 
                    placeholder="Special requirements or information"
                    className="resize-none"
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#6BA8A9] hover:bg-[#6BA8A9]/90 text-white"
                disabled={loading}
              >
                {loading ? "Processing..." : "Book Service"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookService;
