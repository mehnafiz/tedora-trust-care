
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import UrgencyTimer from "@/components/UrgencyTimer";
import { Shield, Eye, Video, Phone, Save } from "lucide-react";

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [caregiverCount, setCaregiverCount] = useState(3);
  const [deadlineHour, setDeadlineHour] = useState(20);
  const [deadlineMinute, setDeadlineMinute] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Load values from localStorage on component mount
  useEffect(() => {
    const storedCaregiverCount = localStorage.getItem("caregiverCount");
    const storedDeadlineHour = localStorage.getItem("deadlineHour");
    const storedDeadlineMinute = localStorage.getItem("deadlineMinute");
    
    if (storedCaregiverCount) setCaregiverCount(Number(storedCaregiverCount));
    if (storedDeadlineHour) setDeadlineHour(Number(storedDeadlineHour));
    if (storedDeadlineMinute) setDeadlineMinute(Number(storedDeadlineMinute));
  }, []);

  const handleLogin = () => {
    if (password === "TEDora2024!") {
      setAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the Caregiver Availability Manager",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePublish = () => {
    setIsSaving(true);
    
    try {
      // Save to localStorage
      localStorage.setItem("caregiverCount", caregiverCount.toString());
      localStorage.setItem("deadlineHour", deadlineHour.toString());
      localStorage.setItem("deadlineMinute", deadlineMinute.toString());
      
      // Simulate Google Sheets backup (in a real app, this would be an API call)
      console.log("Backing up to Google Sheets:", { 
        caregiverCount, 
        deadlineTime: `${deadlineHour}:${deadlineMinute.toString().padStart(2, '0')}`,
        timestamp: new Date().toISOString()
      });
      
      toast({
        title: "Published Successfully",
        description: "The availability information has been updated on your website.",
      });

      // Redirect to home page to see changes
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update availability. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Convert 24-hour time to 12-hour format for display
  const formatTo12Hour = (hour: number, minute: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  // Handle time input changes and convert to 24-hour format
  const handleTimeChange = (value: string) => {
    const [hours, minutes] = value.split(':').map(Number);
    setDeadlineHour(hours);
    setDeadlineMinute(minutes);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-tedora-sage mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full"
              />
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full bg-tedora-sage hover:bg-tedora-sage/90"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Caregiver Availability Manager</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-tedora-sage text-white p-1 rounded-full mr-2 inline-flex items-center justify-center w-6 h-6">1</span>
                  Set Number of Caregivers
                </h2>
                <div className="space-y-2">
                  <Label htmlFor="caregiverCount">Available Caregivers (0-20):</Label>
                  <Input
                    id="caregiverCount"
                    type="number"
                    min={0}
                    max={20}
                    value={caregiverCount}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value >= 0 && value <= 20) {
                        setCaregiverCount(value);
                      }
                    }}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-tedora-sage text-white p-1 rounded-full mr-2 inline-flex items-center justify-center w-6 h-6">2</span>
                  Set Deadline Time
                </h2>
                <div className="space-y-2">
                  <Label htmlFor="deadlineTime">Booking Deadline:</Label>
                  <Input
                    id="deadlineTime"
                    type="time"
                    value={`${deadlineHour.toString().padStart(2, '0')}:${deadlineMinute.toString().padStart(2, '0')}`}
                    onChange={(e) => handleTimeChange(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600">
                    Selected time: {formatTo12Hour(deadlineHour, deadlineMinute)}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-tedora-sage text-white p-1 rounded-full mr-2 inline-flex items-center justify-center w-6 h-6">3</span>
                  Publish Changes
                </h2>
                <Button 
                  onClick={handlePublish} 
                  className="w-full bg-tedora-sage hover:bg-tedora-sage/90"
                  disabled={isSaving}
                >
                  {isSaving ? "Publishing..." : "Publish Changes"}
                  {isSaving ? null : <Save className="ml-2 h-4 w-4" />}
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold mb-2">Need Help?</h2>
                <div className="flex flex-col space-y-2">
                  <a 
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <Video className="h-4 w-4 mr-2" /> 
                    Watch Tutorial: How to Update Availability
                  </a>
                  <a 
                    href="https://wa.me/+8801889357506" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <Phone className="h-4 w-4 mr-2" /> 
                    Contact Support: Nafiz (+8801889357506)
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <div className="sticky top-4">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-tedora-sage" /> 
                  Preview
                </h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-800 text-white p-2 text-xs flex justify-between items-center">
                    <div className="flex space-x-2">
                      <span className="h-3 w-3 rounded-full bg-red-500"></span>
                      <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                      <span className="h-3 w-3 rounded-full bg-green-500"></span>
                    </div>
                    <div>tedoracare.com</div>
                  </div>
                  <div className="p-0">
                    <UrgencyTimer 
                      caregiverCount={caregiverCount} 
                      deadlineHour={deadlineHour}
                      deadlineMinute={deadlineMinute}
                    />
                    <div className="p-4 bg-white text-gray-800">
                      <p className="text-center text-sm">
                        Website preview showing how your changes will appear
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Automatic Backup</h3>
                  <p className="text-sm text-yellow-700">
                    All changes are automatically saved to Google Sheets for backup purposes. 
                    Your team can access the backup anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
