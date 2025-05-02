
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PhoneCall } from "lucide-react";

const LeaveRequests = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Just for demonstration purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-tedora-sage" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Leave Requests</h1>
        
        <div className="mt-6">
          <Tabs defaultValue="apply">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="apply">Apply for Leave</TabsTrigger>
              <TabsTrigger value="pending">Pending Requests</TabsTrigger>
              <TabsTrigger value="history">Request History</TabsTrigger>
            </TabsList>
            <TabsContent value="apply" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Leave Application</CardTitle>
                  <CardDescription>
                    For leave requests, please contact us directly via phone.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                    <h3 className="text-xl font-medium text-amber-800 mb-4">Contact TEDora+ HR Department</h3>
                    <p className="text-amber-700 mb-6">
                      To apply for leave or discuss your request, please contact us directly through our HR department.
                    </p>
                    <div className="flex justify-center">
                      <a 
                        href="tel:+8801772322383" 
                        className="inline-flex items-center px-4 py-2 bg-tedora-sage text-white rounded-md hover:bg-tedora-sage/90 transition-colors"
                      >
                        <PhoneCall className="mr-2 h-4 w-4" />
                        Call +8801772322383
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pending" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Leave Requests</CardTitle>
                  <CardDescription>
                    Your leave requests that are waiting for approval.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8">
                    <p className="text-gray-500">You have no pending leave requests.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Leave Request History</CardTitle>
                  <CardDescription>
                    History of your past leave requests and their status.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8">
                    <p className="text-gray-500">No leave request history found.</p>
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

export default LeaveRequests;
