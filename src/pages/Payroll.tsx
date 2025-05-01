
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Payroll = () => {
  const [selectedMonth, setSelectedMonth] = useState("current");
  
  // Demo payroll data
  const payrollData = {
    current: {
      month: "May 2025",
      baseSalary: 35000,
      bonus: 3000,
      overtimeHours: 8,
      overtimePay: 2000,
      deductions: 1500,
      netPay: 38500,
      paymentStatus: "Pending",
      paymentDate: "31 May 2025"
    },
    previous: {
      month: "April 2025",
      baseSalary: 35000,
      bonus: 0,
      overtimeHours: 4,
      overtimePay: 1000,
      deductions: 1500,
      netPay: 34500,
      paymentStatus: "Paid",
      paymentDate: "30 April 2025"
    }
  };
  
  const payslip = payrollData[selectedMonth as keyof typeof payrollData];
  
  // Demo attendance data
  const attendanceData = [
    { date: "01 May 2025", checkIn: "08:15 AM", checkOut: "05:05 PM", hours: 8, status: "Present" },
    { date: "02 May 2025", checkIn: "08:10 AM", checkOut: "05:00 PM", hours: 8, status: "Present" },
    { date: "03 May 2025", checkIn: "08:05 AM", checkOut: "06:00 PM", hours: 10, status: "Overtime" },
    { date: "04 May 2025", checkIn: "08:00 AM", checkOut: "05:30 PM", hours: 9.5, status: "Overtime" },
    { date: "05 May 2025", checkIn: "-", checkOut: "-", hours: 0, status: "Leave" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-montserrat font-bold">Payroll Information</h2>
          <Tabs defaultValue="current" onValueChange={setSelectedMonth} className="w-[300px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Current Month</TabsTrigger>
              <TabsTrigger value="previous">Previous Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Net Pay</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">৳ {payslip.netPay.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">{payslip.month}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Payment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                  payslip.paymentStatus === "Paid" ? "bg-green-500" : "bg-amber-500"
                }`}></span>
                <p className="text-lg font-semibold">{payslip.paymentStatus}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {payslip.paymentStatus === "Paid" ? "Paid on" : "Expected"}: {payslip.paymentDate}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Bonus & Overtime</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">৳ {(payslip.bonus + payslip.overtimePay).toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">{payslip.overtimeHours} overtime hours</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Salary Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b">
                <span>Base Salary</span>
                <span className="font-semibold">৳ {payslip.baseSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Overtime Pay</span>
                <span className="font-semibold">৳ {payslip.overtimePay.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Bonus</span>
                <span className="font-semibold">৳ {payslip.bonus.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Deductions</span>
                <span className="font-semibold text-red-500">- ৳ {payslip.deductions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 font-bold">
                <span>Net Pay</span>
                <span>৳ {payslip.netPay.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <h2 className="text-xl font-montserrat font-bold mt-8">Attendance Record</h2>
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.checkIn}</TableCell>
                    <TableCell>{record.checkOut}</TableCell>
                    <TableCell>{record.hours}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        record.status === "Present" ? "bg-green-100 text-green-800" :
                        record.status === "Overtime" ? "bg-blue-100 text-blue-800" :
                        "bg-amber-100 text-amber-800"
                      }`}>
                        {record.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Payroll;
