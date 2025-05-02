
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin } from "lucide-react";

const EmployeeSchedule = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const scheduledAppointments = [
    {
      id: 1,
      client: "Mrs. Rahman",
      service: "Elderly Care",
      date: "May 3, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Gulshan, Dhaka",
      status: "Upcoming"
    }
  ];

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Schedule</h1>
        <p className="mt-2 text-sm text-gray-600">
          View and manage your upcoming assignments
        </p>
        
        <div className="mt-6">
          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="all">All Assignments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Assignments</CardTitle>
                  <CardDescription>
                    Your scheduled assignments for the next 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {scheduledAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {scheduledAppointments.map((appointment) => (
                        <div 
                          key={appointment.id}
                          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-gray-900">{appointment.service}</h3>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {appointment.status}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-1">Client: {appointment.client}</p>
                          <div className="text-gray-600 text-sm space-y-1 mt-2">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-tedora-sage" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-tedora-sage" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-tedora-sage" />
                              <span>{appointment.location}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <p className="text-gray-500">No upcoming assignments.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Completed Assignments</CardTitle>
                  <CardDescription>
                    Your recent completed assignments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8">
                    <p className="text-gray-500">No completed assignments found.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="all" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Assignments</CardTitle>
                  <CardDescription>
                    Complete history of your assignments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8">
                    <p className="text-gray-500">No assignment history to display.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeSchedule;
