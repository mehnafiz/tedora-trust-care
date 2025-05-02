
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock, MapPin, User, Check, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

const EmployeeSchedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<any[]>([]);
  const { toast } = useToast();

  // Sample appointments - in a real app, these would come from your backend
  const sampleAppointments = [
    {
      id: 1,
      clientName: "Ahmed Family",
      address: "House 7, Road 13, Block D, Gulshan, Dhaka",
      serviceType: "Childcare",
      status: "confirmed",
      time: "09:00 AM - 12:00 PM",
      checkedIn: false
    },
    {
      id: 2,
      clientName: "Rahman Family",
      address: "Apartment 5B, Tower 3, Bashundhara R/A, Dhaka",
      serviceType: "Elderly Care",
      status: "confirmed",
      time: "02:00 PM - 06:00 PM",
      checkedIn: false
    }
  ];

  useEffect(() => {
    // Initialize with today's appointments
    if (date && 
        date.getDate() === new Date().getDate() && 
        date.getMonth() === new Date().getMonth() && 
        date.getFullYear() === new Date().getFullYear()) {
      setAppointments(sampleAppointments);
    }
  }, []);

  const handleCheckIn = (appointmentId: number) => {
    setAppointments(prev => 
      prev.map(app => 
        app.id === appointmentId ? { ...app, checkedIn: true } : app
      )
    );
    
    toast({
      title: "Checked In Successfully",
      description: "You have checked in for this appointment.",
      // Fix the build error - change "success" to "default"
      variant: "default"
    });
  };

  const handleComplete = (appointmentId: number) => {
    setAppointments(prev => prev.filter(app => app.id !== appointmentId));
    
    toast({
      title: "Service Completed",
      description: "The service has been marked as completed.",
      // Fix the build error - change "success" to "default" 
      variant: "default"
    });
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    
    // In a real app, you would fetch appointments for this date
    // For demo purposes, we'll show sample data for today and empty for other days
    if (newDate && 
        newDate.getDate() === new Date().getDate() && 
        newDate.getMonth() === new Date().getMonth() && 
        newDate.getFullYear() === new Date().getFullYear()) {
      setAppointments(sampleAppointments);
    } else {
      setAppointments([]);
    }
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        <div className="lg:col-span-1">
          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-md">
            <CardHeader className="bg-gradient-to-r from-tedora-sage/30 to-transparent pb-3">
              <CardTitle className="text-slate-800">Schedule</CardTitle>
              <CardDescription>
                View and manage your assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal mb-4 border-slate-300 hover:border-tedora-sage",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-tedora-sage" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              
              <div className="mt-6 space-y-2">
                <h3 className="text-sm font-semibold text-slate-700">Upcoming Dates</h3>
                
                <div className="bg-gradient-to-r from-tedora-sage/20 to-transparent p-3 rounded-md border border-tedora-sage/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{format(new Date(), "EEEE, MMM d")}</p>
                      <p className="text-xs text-gray-500">{appointments.length} assignments</p>
                    </div>
                    <Badge className="bg-tedora-sage text-white">Today</Badge>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-md border border-slate-200 hover:border-tedora-sage/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{format(new Date(new Date().setDate(new Date().getDate() + 1)), "EEEE, MMM d")}</p>
                      <p className="text-xs text-gray-500">No assignments</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-md border border-slate-200 hover:border-tedora-sage/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{format(new Date(new Date().setDate(new Date().getDate() + 2)), "EEEE, MMM d")}</p>
                      <p className="text-xs text-gray-500">1 assignment</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="font-medium text-amber-800 flex items-center gap-2">
                  <Clock size={16} />
                  Need Help?
                </h4>
                <p className="text-sm text-amber-700 mt-2">
                  For schedule adjustments or questions, please contact us directly at:
                </p>
                <p className="text-sm font-bold text-amber-900 mt-1">
                  +8801772322383
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-md">
            <CardHeader className="bg-gradient-to-r from-tedora-sage/30 to-transparent">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-slate-800">
                    Assignments for {date ? format(date, "EEEE, MMMM d, yyyy") : "Today"}
                  </CardTitle>
                  <CardDescription>
                    Complete your assignments and mark them as done
                  </CardDescription>
                </div>
                <Badge 
                  className={`${appointments.length > 0 ? 'bg-tedora-sage' : 'bg-slate-400'} text-white`}
                >
                  {appointments.length} {appointments.length === 1 ? 'Assignment' : 'Assignments'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <Card key={appointment.id} className="border-l-4 border-tedora-sage overflow-hidden hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-tedora-sage mr-2" />
                            <span className="text-sm font-medium">{appointment.time}</span>
                          </div>
                          <Badge 
                            className={`${
                              appointment.status === 'confirmed' 
                                ? 'bg-green-500' 
                                : appointment.status === 'pending' 
                                ? 'bg-yellow-500' 
                                : 'bg-red-500'
                            } text-white`}
                          >
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </Badge>
                        </div>
                        
                        <h3 className="font-semibold text-lg text-tedora-sage">{appointment.serviceType}</h3>
                        
                        <div className="mt-2 space-y-2">
                          <div className="flex items-start">
                            <User className="h-4 w-4 text-slate-500 mt-1 mr-2" />
                            <span className="text-sm">{appointment.clientName}</span>
                          </div>
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 text-slate-500 mt-1 mr-2" />
                            <span className="text-sm">{appointment.address}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end gap-2">
                          {appointment.checkedIn ? (
                            <div className="flex gap-2">
                              <Badge className="bg-green-500 flex items-center text-white">
                                <Check className="h-3 w-3 mr-1" />
                                Checked In
                              </Badge>
                              
                              <Button 
                                size="sm"
                                onClick={() => handleComplete(appointment.id)}
                                className="bg-tedora-peach hover:bg-tedora-peach/90 text-white"
                              >
                                <Check className="h-3 w-3 mr-1" />
                                Mark Complete
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              size="sm"
                              onClick={() => handleCheckIn(appointment.id)}
                              className="bg-tedora-sage hover:bg-tedora-sage/90 text-white"
                            >
                              Check In
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-50">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg border-gray-200">
                  <div className="bg-slate-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Calendar className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-lg font-medium text-slate-700">No assignments for this date</p>
                  <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
                    You have no scheduled assignments for the selected date. When clients book services, they will appear here.
                  </p>
                  <p className="text-xs text-tedora-sage font-medium">
                    Check back later or contact the office for more information.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeSchedule;
