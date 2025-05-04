
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRoleCheck } from "@/hooks/useRoleCheck";
import { 
  LayoutDashboard, 
  Calendar, 
  MessageCircle, 
  CreditCard, 
  Clock, 
  FileMinus 
} from "lucide-react";

interface NavigationItem {
  name: string;
  path: string;
  icon: ReactNode;
}

interface DashboardNavigationProps {
  onItemClick?: () => void;
}

export const DashboardNavigation = ({ onItemClick }: DashboardNavigationProps) => {
  const location = useLocation();
  const { isClient, isEmployee } = useRoleCheck();
  
  // Define navigation items based on user role
  const getNavigationItems = (): NavigationItem[] => {
    const commonItems = [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: <LayoutDashboard className="h-5 w-5" />,
      },
      {
        name: "Chat Support",
        path: "/chat",
        icon: <MessageCircle className="h-5 w-5" />,
      },
    ];

    const clientItems = [
      {
        name: "Book Services",
        path: "/book-service",
        icon: <Calendar className="h-5 w-5" />,
      },
      {
        name: "Payment Management",
        path: "/payment-management",
        icon: <CreditCard className="h-5 w-5" />,
      },
    ];

    const employeeItems = [
      {
        name: "My Schedule",
        path: "/schedule",
        icon: <Calendar className="h-5 w-5" />,
      },
      {
        name: "Service Reports",
        path: "/reports",
        icon: <Clock className="h-5 w-5" />,
      },
      {
        name: "Leave Requests",
        path: "/leave-requests",
        icon: <FileMinus className="h-5 w-5" />,
      },
      {
        name: "Payroll",
        path: "/payroll",
        icon: <CreditCard className="h-5 w-5" />,
      },
    ];

    if (isClient) {
      return [...commonItems, ...clientItems];
    } else if (isEmployee) {
      return [...commonItems, ...employeeItems];
    }

    return commonItems;
  };
  
  const navigationItems = getNavigationItems();

  return (
    <nav className="flex-1 pt-4 px-2 overflow-y-auto">
      <ul className="space-y-1">
        {navigationItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-tedora-sage/10 text-tedora-sage font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={onItemClick}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
