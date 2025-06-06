
import { useState, ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6BA8A9]/5 to-[#FF9E7D]/5 flex">
      {/* Mobile menu toggle */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 p-2 rounded-full bg-white shadow-md"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <X className="h-5 w-5 text-gray-600" />
          ) : (
            <Menu className="h-5 w-5 text-gray-600" />
          )}
        </button>
      )}

      {/* Sidebar */}
      <DashboardSidebar 
        sidebarOpen={sidebarOpen} 
        isMobile={isMobile} 
        onCloseSidebar={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className={`flex-1 ${!isMobile ? "ml-64" : ""} transition-all w-full`}>
        <div className="container mx-auto px-4 py-6 safe-x-padding safe-y-padding">
          {/* Header */}
          <DashboardHeader toggleSidebar={toggleSidebar} />

          {/* Page content */}
          <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm p-4 sm:p-6">
            {children}
          </div>
          
          {/* Bottom padding for mobile fixed elements */}
          <div className="h-16 md:h-0"></div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
