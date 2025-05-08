
import { useLocation } from "react-router-dom";
import { Bell, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRoleCheck } from "@/hooks/useRoleCheck";

interface DashboardHeaderProps {
  toggleSidebar?: () => void;
}

export const DashboardHeader = ({ toggleSidebar }: DashboardHeaderProps) => {
  const location = useLocation();
  const { isClient, isEmployee, user } = useRoleCheck();
  
  // Get username from metadata if available
  const userName = user?.user_metadata?.name || 'User';
  
  // Get portal type based on user role
  const getPortalType = () => {
    if (isClient) return "Family Account";
    if (isEmployee) return "Staff Portal";
    return "";
  };

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
      case "/family-profile":
        return "Family Profile";
      default:
        return "";
    }
  };

  return (
    <div className="mb-6 bg-white rounded-lg shadow-sm p-3 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-montserrat font-bold text-tedora-teal">
          {getPageTitle()}
        </h1>
        <div className="flex items-center gap-1">
          <p className="text-sm text-gray-500 hidden sm:block">
            {userName} | <span className="text-tedora-teal font-medium">{getPortalType()}</span>
          </p>
        </div>
        <p className="text-xs text-gray-400 hidden sm:block mt-0.5">
          TEDora+ | Trust Everyday Care
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full border-tedora-teal/30"
          onClick={() => window.location.href = "tel:+8801772322383"}
        >
          <PhoneCall className="h-4 w-4 text-tedora-teal" />
        </Button>
        <Button variant="outline" size="sm" className="rounded-full border-tedora-teal/30">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
