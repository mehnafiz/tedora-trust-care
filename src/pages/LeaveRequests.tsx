
import { useState } from "react";
import { Loader2, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";

const LeaveRequests = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("request");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Demo leave history
  const leaveHistory = [
    { 
      id: 1, 
      type: "Sick Leave", 
      startDate: "10 Apr 2025", 
      endDate: "12 Apr 2025", 
      days: 3, 
      reason: "Medical appointment and recovery", 
      status: "Approved",
      approvedBy: "Mahmud Rahman" 
    },
    { 
      id: 2, 
      type: "Annual Leave", 
      startDate: "01 Mar 2025", 
      endDate: "05 Mar 2025", 
      days: 5, 
      reason: "Family vacation", 
      status: "Approved",
      approvedBy: "Mahmud Rahman" 
    },
    { 
      id: 3, 
      type: "Emergency Leave", 
      startDate: "15 Feb 2025", 
      endDate: "16 Feb 2025", 
      days: 2, 
      reason: "Personal emergency", 
      status: "Approved",
      approvedBy: "Mahmud Rahman" 
    }
  ];
  
  const handleSubmitLeaveRequest = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Leave Request Submitted",
        description: "Your leave request has been submitted for approval",
      });
      setActiveTab("history");
    }, 1500);
  };

  // Leave balance data
  const leaveBalance = {
    annual: { total: 20, used: 5, remaining: 15 },
    sick: { total: 10, used: 3, remaining: 7 },
    casual: { total: 5, used: 0, remaining: 5 }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-montserrat font-bold">Leave Management</h2>
          <Tabs defaultValue="request" value={activeTab} onValueChange={setActiveTab} className="w-[300px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="request">New Request</TabsTrigger>
              <TabsTrigger value="history">Leave History</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Leave Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Annual Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{leaveBalance.annual.remaining} days</p>
              <p className="text-xs text-gray-500 mt-1">
                Used: {leaveBalance.annual.used} / {leaveBalance.annual.total}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-tedora-sage h-2.5 rounded-full" 
                  style={{ width: `${(leaveBalance.annual.used / leaveBalance.annual.total) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Sick Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{leaveBalance.sick.remaining} days</p>
              <p className="text-xs text-gray-500 mt-1">
                Used: {leaveBalance.sick.used} / {leaveBalance.sick.total}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-tedora-peach h-2.5 rounded-full" 
                  style={{ width: `${(leaveBalance.sick.used / leaveBalance.sick.total) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Casual Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{leaveBalance.casual.remaining} days</p>
              <p className="text-xs text-gray-500 mt-1">
                Used: {leaveBalance.casual.used} / {leaveBalance.casual.total}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full" 
                  style={{ width: `${(leaveBalance.casual.used / leaveBalance.casual.total) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <TabsContent value="request" className="mt-6 space-y-0">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Leave Type</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="">Select leave type</option>
                    <option value="annual">Annual Leave</option>
                    <option value="sick">Sick Leave</option>
                    <option value="casual">Casual Leave</option>
                    <option value="emergency">Emergency Leave</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <span className="px-3 py-2 bg-gray-100">
                        <Calendar className="h-4 w-4 text-gray-500" />
                      </span>
                      <input type="date" className="flex-1 p-2 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <span className="px-3 py-2 bg-gray-100">
                        <Calendar className="h-4 w-4 text-gray-500" />
                      </span>
                      <input type="date" className="flex-1 p-2 outline-none" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Reason for Leave</label>
                  <textarea 
                    className="w-full p-2 border rounded-md min-h-[100px]"
                    placeholder="Please provide the reason for your leave request..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Contact During Leave</label>
                  <input 
                    type="tel" 
                    className="w-full p-2 border rounded-md"
                    placeholder="Phone number during your leave period"
                  />
                </div>
                
                <div className="flex items-center">
                  <input type="checkbox" id="handover" className="mr-2" />
                  <label htmlFor="handover" className="text-sm">I have completed necessary handover procedures</label>
                </div>
                
                <Button 
                  className="w-full bg-tedora-sage hover:bg-tedora-sage/90"
                  onClick={handleSubmitLeaveRequest}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Submit Leave Request"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6 space-y-0">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Approved By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveHistory.map((leave) => (
                    <TableRow key={leave.id}>
                      <TableCell>{leave.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-gray-400" />
                          <span>{leave.startDate} to {leave.endDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>{leave.days}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          leave.status === "Approved" ? "bg-green-100 text-green-800" :
                          leave.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {leave.status}
                        </span>
                      </TableCell>
                      <TableCell>{leave.approvedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </DashboardLayout>
  );
};

export default LeaveRequests;
