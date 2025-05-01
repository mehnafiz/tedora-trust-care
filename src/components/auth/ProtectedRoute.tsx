
import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  user: any | null;
  isLoading: boolean;
  requiredRole?: "client" | "employee";
  isClient?: boolean;
  isEmployee?: boolean;
}

const ProtectedRoute = ({ 
  user, 
  isLoading, 
  requiredRole, 
  isClient = false, 
  isEmployee = false 
}: ProtectedRouteProps) => {
  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6BA8A9]/10 to-[#FF9E7D]/10">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-tedora-sage mx-auto mb-4" />
          <p className="text-gray-600">Verifying your access...</p>
        </div>
      </div>
    );
  }

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If a specific role is required, check that too
  if (requiredRole) {
    if (requiredRole === "client" && !isClient) {
      return <Navigate to="/dashboard" />;
    }
    
    if (requiredRole === "employee" && !isEmployee) {
      return <Navigate to="/dashboard" />;
    }
  }

  // If all checks pass, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
