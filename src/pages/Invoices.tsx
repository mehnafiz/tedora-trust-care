
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
import { Input } from "@/components/ui/input";
import { FileText, Download, Search, Calendar, Filter, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

// Sample invoice data
const sampleInvoices = [
  {
    id: "INV-2023-001",
    date: "2023-05-15",
    amount: 4500.00,
    status: "paid",
    services: [
      { name: "Full-Day Childcare", date: "2023-05-10", amount: 1499.00 },
      { name: "Hourly Babysitting", date: "2023-05-12", amount: 1499.00 },
      { name: "Hourly Babysitting", date: "2023-05-14", amount: 1499.00 }
    ]
  },
  {
    id: "INV-2023-002",
    date: "2023-05-30",
    amount: 2998.00,
    status: "paid",
    services: [
      { name: "Full-Day Childcare", date: "2023-05-20", amount: 1499.00 },
      { name: "Full-Day Childcare", date: "2023-05-25", amount: 1499.00 }
    ]
  },
  {
    id: "INV-2023-003",
    date: "2023-06-15",
    amount: 3998.00,
    status: "pending",
    services: [
      { name: "Elderly Care (Daily)", date: "2023-06-01", amount: 1799.00 },
      { name: "Overnight Care", date: "2023-06-10", amount: 1999.00 }
    ]
  }
];

const Invoices = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const { toast } = useToast();

  const filteredInvoices = sampleInvoices.filter(invoice => {
    // Apply status filter
    if (filter !== "all" && invoice.status !== filter) {
      return false;
    }
    
    // Apply search filter if search query exists
    if (searchQuery) {
      return (
        invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.services.some(service => 
          service.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    return true;
  });

  const handleDownload = (invoiceId: string) => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice ${invoiceId} has been downloaded.`,
    });
  };

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
  };

  const formatBDT = (amount: number) => {
    return `৳${amount.toLocaleString('en-IN')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <DashboardLayout>
      {!selectedInvoice ? (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">Invoices</h1>
              <p className="text-gray-500">Manage and view your invoices</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-[250px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search invoices..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilter("all")}>
                    All Invoices
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("paid")}>
                    Paid Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("pending")}>
                    Pending Only
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {filteredInvoices.length > 0 ? (
            <div className="space-y-4">
              {filteredInvoices.map((invoice) => (
                <Card key={invoice.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-gray-100">
                          <FileText className="h-5 w-5 text-tedora-sage" />
                        </div>
                        <div>
                          <h3 className="font-medium">{invoice.id}</h3>
                          <p className="text-sm text-gray-500">
                            {format(new Date(invoice.date), "MMMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-3 sm:mt-0">
                        <Badge className={`mr-3 ${getStatusColor(invoice.status)}`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </Badge>
                        <p className="font-semibold">
                          {formatBDT(invoice.amount)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <p className="text-sm font-medium mb-2">Services Included:</p>
                      <ul className="text-sm text-gray-600">
                        {invoice.services.map((service, idx) => (
                          <li key={idx} className="flex justify-between py-1">
                            <span>{service.name} ({format(new Date(service.date), "MMM d")})</span>
                            <span>{formatBDT(service.amount)}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex justify-end gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-tedora-sage border-tedora-sage hover:bg-tedora-sage/10"
                          onClick={() => handleViewInvoice(invoice)}
                        >
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          className="bg-tedora-sage hover:bg-tedora-sage/90"
                          onClick={() => handleDownload(invoice.id)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed rounded-lg border-gray-200">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-500">No invoices found</p>
              <p className="text-sm text-gray-400 mb-4">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : filter !== "all"
                  ? `No ${filter} invoices found`
                  : "You don't have any invoices yet"}
              </p>
              {searchQuery && (
                <Button 
                  variant="outline" 
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={() => setSelectedInvoice(null)}
            >
              Back to Invoices
            </Button>
            <Button 
              className="bg-tedora-sage hover:bg-tedora-sage/90"
              onClick={() => handleDownload(selectedInvoice.id)}
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b pb-6">
              <div>
                <CardTitle className="text-2xl">Invoice {selectedInvoice.id}</CardTitle>
                <CardDescription>
                  Issued on {format(new Date(selectedInvoice.date), "MMMM d, yyyy")}
                </CardDescription>
              </div>
              <Badge className={`${getStatusColor(selectedInvoice.status)}`}>
                {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
              </Badge>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Bill From</h3>
                  <p className="font-medium">TEDora+ Care Services</p>
                  <p className="text-gray-600">Gulshan Avenue</p>
                  <p className="text-gray-600">Dhaka, Bangladesh</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Bill To</h3>
                  <p className="font-medium">Ahmed Family</p>
                  <p className="text-gray-600">House 7, Road 13, Block D</p>
                  <p className="text-gray-600">Gulshan, Dhaka</p>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden mb-8">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedInvoice.services.map((service: any, idx: number) => (
                      <tr key={idx}>
                        <td className="px-4 py-4 text-sm text-gray-900">{service.name}</td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {format(new Date(service.date), "MMMM d, yyyy")}
                        </td>
                        <td className="px-4 py-4 text-sm text-right text-gray-900">
                          {formatBDT(service.amount)}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td className="px-4 py-4 font-medium" colSpan={2}>Total</td>
                      <td className="px-4 py-4 text-right font-bold">
                        {formatBDT(selectedInvoice.amount)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="border-t pt-6 flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="font-medium mb-2">Payment Information</h3>
                  <p className="text-sm text-gray-600">Payment Method: Credit Card / bKash / Nagad</p>
                  {selectedInvoice.status === "paid" ? (
                    <p className="text-sm text-green-600 font-medium mt-1">
                      Paid on {format(new Date(selectedInvoice.date), "MMMM d, yyyy")}
                    </p>
                  ) : (
                    <p className="text-sm text-yellow-600 font-medium mt-1">
                      Payment Due: {format(new Date(selectedInvoice.date), "MMMM d, yyyy")}
                    </p>
                  )}
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="text-sm text-gray-600 mb-1">Thank you for choosing TEDora+</p>
                  <p className="text-xs text-gray-500">For any questions, please contact our support</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Invoices;
