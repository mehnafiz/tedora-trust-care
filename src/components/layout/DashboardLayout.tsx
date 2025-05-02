
import { useState, ReactNode } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-mobile";
import {
  LayoutDashboard,
  Calendar,
  Users,
  MessageCircle,
  LogOut,
  Menu,
  X,
  CreditCard,
  Clock,
  FileMinus,
  Bell,
  ChevronDown,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRoleCheck } from "@/hooks/useRoleCheck";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isClient, isEmployee, user } = useRoleCheck();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  // Generate user initials for avatar
  const getUserInitials = () => {
    if (!user) return "U";
    
    const name = user.user_metadata?.name || "";
    if (!name) return user.email?.charAt(0).toUpperCase() || "U";
    
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out successfully",
      description: "You have been signed out of your account.",
    });
    navigate("/login");
  };

  // Define navigation items based on user role
  const getNavigationItems = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-[#6BA8A9]/5 to-[#FF9E7D]/5 flex">
      {/* Mobile menu toggle */}
      {isMobile && (
        <button
          className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <X className="h-5 w-5 text-gray-600" />
          ) : (
            <Menu className="h-5 w-5 text-gray-600" />
          )}
        </button>
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: isMobile ? -250 : 0 }}
        animate={{ x: sidebarOpen || !isMobile ? 0 : -250 }}
        transition={{ duration: 0.2 }}
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r shadow-lg z-40 ${
          (!isMobile || sidebarOpen) ? "flex flex-col" : "hidden"
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/lovable-uploads/47c58735-b6ab-46e9-8705-6f0e66f3ed34.png"
              alt="TEDora+ Logo"
              className="h-10 w-10 rounded-full"
            />
            <span className="text-xl font-bold text-tedora-sage">TEDora+</span>
          </Link>
        </div>

        {/* User info */}
        <div className="p-4 border-b">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-tedora-sage/20 text-tedora-sage">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium truncate max-w-[120px]">
                    {user?.user_metadata?.name || user?.email || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isClient ? "Family Account" : isEmployee ? "Staff" : "User"}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 ml-auto" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-red-500 cursor-pointer"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation */}
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
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact section */}
        <div className="p-4 border-t mt-auto">
          <div className="bg-gradient-to-r from-tedora-sage/10 to-transparent p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <PhoneCall className="h-4 w-4 text-tedora-sage" />
              <p className="text-sm font-medium text-tedora-sage">Need Help?</p>
            </div>
            <p className="text-xs text-gray-600 mb-2">For the fastest service, call us directly</p>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-tedora-sage text-tedora-sage hover:bg-tedora-sage/10"
              onClick={() => window.location.href = "tel:+8801772322383"}
            >
              +8801772322383
            </Button>
          </div>
        </div>

        {/* Logout button */}
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-red-500"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sign out
          </Button>
        </div>
      </motion.div>

      {/* Main content */}
      <div className={`flex-1 ${!isMobile ? "ml-64" : ""} transition-all`}>
        <div className="container mx-auto px-4 py-6">
          {/* Notifications bar */}
          <div className="mb-6 bg-white rounded-lg shadow-sm p-3 flex justify-between items-center">
            <h1 className="text-xl font-montserrat font-bold text-gray-800">
              {location.pathname === "/dashboard"
                ? "Dashboard"
                : location.pathname === "/book-service"
                ? "Book Services"
                : location.pathname === "/schedule"
                ? "My Schedule"
                : location.pathname === "/chat"
                ? "Chat Support"
                : location.pathname === "/payment-management"
                ? "Payment Management"
                : location.pathname === "/reports"
                ? "Service Reports"
                : location.pathname === "/payroll"
                ? "Payroll"
                : location.pathname === "/leave-requests"
                ? "Leave Requests"
                : ""}
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

          {/* Page content */}
          <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm p-6">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
