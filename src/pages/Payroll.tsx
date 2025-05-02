
import { useState } from "react";
import { PhoneCall, Mail, Building, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const Payroll = () => {
  const { toast } = useToast();
  
  const handleCallNow = () => {
    toast({
      title: "Calling TEDora+ Finance",
      description: "Redirecting you to call our finance department",
    });
    window.location.href = "tel:+8801772322383";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-xl font-montserrat font-bold">Payroll Information</h2>
        
        <Card className="border border-slate-200 shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-tedora-peach to-tedora-peach/70 p-6">
            <CardHeader className="p-0 pb-6">
              <CardTitle className="text-white text-2xl">TEDora+ Staff Payroll</CardTitle>
            </CardHeader>
            <p className="text-white/90">
              Our online payroll system is currently being enhanced to provide you with more features.
              For now, please use the direct contact methods below for any payroll-related inquiries.
            </p>
          </div>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-tedora-peach/10 rounded-full flex items-center justify-center mb-4">
                    <PhoneCall className="h-6 w-6 text-tedora-peach" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Call Finance</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    For immediate assistance regarding your salary, payments, or reimbursements.
                  </p>
                  <Button 
                    onClick={handleCallNow}
                    className="bg-tedora-peach hover:bg-tedora-peach/90 text-white w-full"
                  >
                    Call Now: +8801772322383
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-tedora-sage/10 rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-tedora-sage" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Email Finance</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Send your payroll inquiries or documentation to our finance department.
                  </p>
                  <Button 
                    variant="outline"
                    className="border-tedora-sage text-tedora-sage hover:bg-tedora-sage/10 w-full"
                    onClick={() => window.location.href = "mailto:finance@tedoraplus.com"}
                  >
                    Email: finance@tedoraplus.com
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Visit Finance Office</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Visit our finance office in person for payroll discussions.
                  </p>
                  <Button 
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500/10 w-full"
                  >
                    10AM - 4PM, Monday to Thursday
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="font-medium text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-tedora-sage" />
                Payroll Schedule
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded border border-slate-200">
                  <span className="font-medium">Monthly Salary</span>
                  <span>Paid on the 1st of each month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded border border-slate-200">
                  <span className="font-medium">Service Bonuses</span>
                  <span>Calculated weekly, paid monthly</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded border border-slate-200">
                  <span className="font-medium">Overtime</span>
                  <span>Included in next month's payment</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded border border-slate-200">
                  <span className="font-medium">Reimbursements</span>
                  <span>Processed within 7 working days</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Payroll;
