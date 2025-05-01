
import { useState } from "react";
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

  const handleCheckIn = (appointmentId: number) => {
    setAppointments(prev => 
      prev.map(app => 
        app.id === appointmentId ? { ...app, checkedIn: true } : app
      )
    );
    
    toast({
      title: "Checked In",
      description: "You have successfully checked in for this appointment.",
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>
                Select a date to view your assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal mb-4",
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
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <div className="mt-6 space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Upcoming Dates</h3>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{format(new Date(), "EEEE, MMM d")}</p>
                      <p className="text-xs text-gray-500">2 appointments</p>
                    </div>
                    <Badge className="bg-tedora-sage">Today</Badge>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-md border">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{format(new Date(new Date().setDate(new Date().getDate() + 1)), "EEEE, MMM d")}</p>
                      <p className="text-xs text-gray-500">No appointments</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-md border">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{format(new Date(new Date().setDate(new Date().getDate() + 2)), "EEEE, MMM d")}</p>
                      <p className="text-xs text-gray-500">1 appointment</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>
                    Appointments for {date ? format(date, "EEEE, MMMM d, yyyy") : "Today"}
                  </CardTitle>
                  <CardDescription>
                    Your schedule and assignments
                  </CardDescription>
                </div>
                <Badge 
                  className={`${appointments.length > 0 ? 'bg-tedora-sage' : 'bg-gray-400'}`}
                >
                  {appointments.length} {appointments.length === 1 ? 'Assignment' : 'Assignments'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <Card key={appointment.id} className="border-l-4 border-tedora-sage overflow-hidden">
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
                            }`}
                          >
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </Badge>
                        </div>
                        
                        <h3 className="font-semibold text-lg">{appointment.serviceType}</h3>
                        
                        <div className="mt-2 space-y-2">
                          <div className="flex items-start">
                            <User className="h-4 w-4 text-gray-400 mt-1 mr-2" />
                            <span className="text-sm">{appointment.clientName}</span>
                          </div>
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 text-gray-400 mt-1 mr-2" />
                            <span className="text-sm">{appointment.address}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end gap-2">
                          {appointment.checkedIn ? (
                            <Badge className="bg-green-500 flex items-center">
                              <Check className="h-3 w-3 mr-1" />
                              Checked In
                            </Badge>
                          ) : (
                            <Button 
                              size="sm"
                              onClick={() => handleCheckIn(appointment.id)}
                              className="bg-tedora-sage hover:bg-tedora-sage/90"
                            >
                              Check In
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 border-2 border-dashed rounded-lg border-gray-200">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-500">No appointments for this date</p>
                  <p className="text-sm text-gray-400 mb-4">
                    You have no scheduled assignments for the selected date.
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
