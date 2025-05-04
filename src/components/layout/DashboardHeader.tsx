
import { useLocation } from "react-router-dom";
import { Bell, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  toggleSidebar?: () => void;
}

export const DashboardHeader = ({ toggleSidebar }: DashboardHeaderProps) => {
  const location = useLocation();

  // Get page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/book-service":
        return "Book Services";
      case "/schedule":
        return "My Schedule";
      case "/chat":
        return "Chat Support";
      case "/payment-management":
        return "Payment Management";
      case "/reports":
        return "Service Reports";
      case "/payroll":
        return "Payroll";
      case "/leave-requests":
        return "Leave Requests";
      case "/invoices":
        return "Invoices";
      default:
        return "";
    }
  };

  return (
    <div className="mb-6 bg-white rounded-lg shadow-sm p-3 flex justify-between items-center">
      <h1 className="text-xl font-montserrat font-bold text-gray-800">
        {getPageTitle()}
      </h1>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full"
          onClick={() => window.location.href = "tel:+8801772322383"}
        >
          <PhoneCall className="h-4 w-4 text-tedora-sage" />
        </Button>
        <Button variant="outline" size="sm" className="rounded-full">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
