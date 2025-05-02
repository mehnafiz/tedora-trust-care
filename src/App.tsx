
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPortal from "./pages/LoginPortal";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BookService from "./pages/BookService";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import FamilyProfile from "./pages/FamilyProfile";
import EmployeeSchedule from "./pages/EmployeeSchedule";
import ServiceReports from "./pages/ServiceReports";
import Invoices from "./pages/Invoices";
import Chat from "./pages/Chat";
import Payroll from "./pages/Payroll";
import LeaveRequests from "./pages/LeaveRequests";
import PaymentManagement from "./pages/PaymentManagement";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        
        if (session?.user) {
          const userData = session.user.user_metadata;
          if (userData && userData.role === "client") {
            setIsClient(true);
            setIsEmployee(false);
          } else if (userData && userData.role === "employee") {
            setIsClient(false);
            setIsEmployee(true);
          } else {
            // Check if user is an employee
            const { data: employee } = await supabase
              .from("employees")
              .select("*")
              .eq("user_id", session.user.id)
              .single();

            if (employee) {
              // Update user metadata
              await supabase.auth.updateUser({
                data: { role: 'employee' }
              });
              
              setIsClient(false);
              setIsEmployee(true);
            } else {
              setIsClient(true);
              setIsEmployee(false);
              
              // Set as client by default
              await supabase.auth.updateUser({
                data: { role: 'client' }
              });
            }
          }
        } else {
          setIsClient(false);
          setIsEmployee(false);
        }
        
        setIsLoading(false);
      }
    );
    
    // Initial session check
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      if (session?.user) {
        const userData = session.user.user_metadata;
        if (userData && userData.role === "client") {
          setIsClient(true);
          setIsEmployee(false);
        } else if (userData && userData.role === "employee") {
          setIsClient(false);
          setIsEmployee(true);
        } else {
          // Check if user is an employee
          const { data: employee } = await supabase
            .from("employees")
            .select("*")
            .eq("user_id", session.user.id)
            .single();

          if (employee) {
            // Update user metadata
            await supabase.auth.updateUser({
              data: { role: 'employee' }
            });
            
            setIsClient(false);
            setIsEmployee(true);
          } else {
            setIsClient(true);
            setIsEmployee(false);
            
            // Set as client by default
            await supabase.auth.updateUser({
              data: { role: 'client' }
            });
          }
        }
      }
      
      setIsLoading(false);
    };
    
    checkSession();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPortal />} />
            <Route path="*" element={<NotFound />} />
            
            {/* Protected routes - both clients and employees */}
            <Route element={<ProtectedRoute user={user} isLoading={isLoading} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<Chat />} />
              
              {/* Client-specific routes */}
              <Route element={<ProtectedRoute user={user} isLoading={isLoading} requiredRole="client" isClient={isClient} />}>
                <Route path="/book-service" element={<BookService />} />
                <Route path="/family-profile" element={<FamilyProfile />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/payment-management" element={
                  <div className="p-8 text-center">
                    <div className="mb-8 p-6 bg-amber-50 rounded-lg border border-amber-300">
                      <h2 className="text-xl font-bold mb-4 text-amber-800">Direct Payment System</h2>
                      <p className="text-amber-700 mb-4">For payment and booking confirmation, please call us directly 📞</p>
                      <a href="tel:+8801772322383" className="inline-block bg-tedora-sage text-white px-6 py-3 rounded-full font-medium hover:bg-tedora-sage/90 transition-colors">
                        Call +8801772322383
                      </a>
                    </div>
                    <p className="text-gray-600">Our customer service team will assist you with payment options and confirm your booking.</p>
                  </div>
                } />
              </Route>
              
              {/* Employee-specific routes */}
              <Route element={<ProtectedRoute user={user} isLoading={isLoading} requiredRole="employee" isEmployee={isEmployee} />}>
                <Route path="/schedule" element={<EmployeeSchedule />} />
                <Route path="/reports" element={<ServiceReports />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/leave-requests" element={<LeaveRequests />} />
              </Route>
              
              {/* Admin routes */}
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
