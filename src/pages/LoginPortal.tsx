
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import RoleSelection from "@/components/auth/RoleSelection";
import AuthForm from "@/components/auth/AuthForm";
import { useToast } from "@/hooks/use-toast";

const LoginPortal = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const userData = session.user.user_metadata;
          
          // If user is logged in, check their role and redirect appropriately
          if (userData && userData.role === "client") {
            navigate('/dashboard');
          } else {
            // Check if they're an employee
            const { data: employee, error } = await supabase
              .from('employees')
              .select('*')
              .eq('user_id', session.user.id)
              .single();
            
            if (employee) {
              navigate('/dashboard');
            } else {
              // If not a client or employee, sign them out
              await supabase.auth.signOut();
              toast({
                title: "Session expired",
                description: "Please log in again",
              });
            }
          }
        }
      } catch (error) {
        console.error("Error checking user session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUser();
  }, [navigate, toast]);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#6BA8A9]/10 to-[#FF9E7D]/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6BA8A9] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking your session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6BA8A9]/10 to-[#FF9E7D]/10">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        {/* Logo and Tagline */}
        <div className="mb-16 text-center">
          <img 
            src="/lovable-uploads/392329e6-0859-48e9-9da2-7918163f0ee5.png" 
            alt="TEDora+ Logo" 
            className="h-32 w-auto mx-auto drop-shadow-lg"
          />
          <h1 className="text-3xl font-montserrat font-bold mt-4 text-gray-800">TEDora+</h1>
          <p className="text-[#6BA8A9] italic">"Trust Everyday Care"</p>
        </div>

        {!selectedRole ? (
          <RoleSelection onRoleSelect={handleRoleSelect} />
        ) : (
          <AuthForm 
            selectedRole={selectedRole}
            onBack={handleBack}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default LoginPortal;
