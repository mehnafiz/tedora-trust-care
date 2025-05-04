
import { useState, ReactNode } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  MessageCircle, 
  LogOut, 
  CreditCard, 
  Clock, 
  FileMinus, 
  PhoneCall, 
  ChevronDown
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
import { DashboardNavigation } from "./DashboardNavigation";

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  isMobile: boolean;
  onCloseSidebar?: () => void;
}

export const DashboardSidebar = ({ 
  sidebarOpen, 
  isMobile,
  onCloseSidebar 
}: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useRoleCheck();
  
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

  return (
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
                  {user?.app_metadata?.role || "User"}
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
      <DashboardNavigation onItemClick={() => isMobile && onCloseSidebar?.()} />

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
  );
};
