
import { useState } from "react";
import { PhoneCall, Calendar, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const LeaveRequests = () => {
  const { toast } = useToast();
  
  const handleCallNow = () => {
    toast({
      title: "Calling TEDora+ HR",
      description: "Redirecting you to call our HR department",
    });
    window.location.href = "tel:+8801772322383";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-xl font-montserrat font-bold">Leave Management</h2>
        
        <Card className="border border-slate-200 shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-tedora-sage to-tedora-sage/70 p-6">
            <CardHeader className="p-0 pb-6">
              <CardTitle className="text-white text-2xl">Leave Request Service</CardTitle>
            </CardHeader>
            <p className="text-white/90">
              Our online leave management system is being upgraded to serve you better.
              For now, please use the direct contact methods below to submit or inquire about leave requests.
            </p>
          </div>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-tedora-sage/10 rounded-full flex items-center justify-center mb-4">
                    <PhoneCall className="h-6 w-6 text-tedora-sage" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Call HR Directly</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    The fastest way to submit your leave request is to call our HR department directly.
                  </p>
                  <Button 
                    onClick={handleCallNow}
                    className="bg-tedora-sage hover:bg-tedora-sage/90 text-white w-full"
                  >
                    Call Now: +8801772322383
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-tedora-peach/10 rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-tedora-peach" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Email Your Request</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Send your leave request details to our HR department via email.
                  </p>
                  <Button 
                    variant="outline"
                    className="border-tedora-peach text-tedora-peach hover:bg-tedora-peach/10 w-full"
                    onClick={() => window.location.href = "mailto:hr@tedoraplus.com"}
                  >
                    Email: hr@tedoraplus.com
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Visit Office</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Come to our office in person to submit your leave application.
                  </p>
                  <Button 
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500/10 w-full"
                  >
                    9AM - 5PM, Monday to Friday
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="font-medium text-amber-800 mb-2">Information Required for Leave Requests:</h3>
              <ul className="text-sm text-amber-700 space-y-2 list-disc pl-5">
                <li>Full name and employee ID</li>
                <li>Type of leave (sick, annual, emergency, etc.)</li>
                <li>Start and end dates of requested leave</li>
                <li>Reason for leave</li>
                <li>Contact information during leave period</li>
                <li>Any hand-over information for ongoing tasks</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LeaveRequests;
