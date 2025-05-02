
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhoneCall } from "lucide-react";

const Payroll = () => {
  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Payroll</h1>
        <p className="mt-2 text-sm text-gray-600">
          View your payment information and history
        </p>
        
        <div className="mt-6">
          <Tabs defaultValue="current">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Current Period</TabsTrigger>
              <TabsTrigger value="history">Payment History</TabsTrigger>
            </TabsList>
            <TabsContent value="current" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Payment Period</CardTitle>
                  <CardDescription>
                    For payment inquiries, please contact us directly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                    <h3 className="text-xl font-medium text-amber-800 mb-4">Contact TEDora+ Finance Department</h3>
                    <p className="text-amber-700 mb-6">
                      To check your current payment status or discuss any payment-related matters, please contact us directly.
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
            
            <TabsContent value="history" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>
                    View your past payment records
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8">
                    <p className="text-gray-500">No payment history found.</p>
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

export default Payroll;
