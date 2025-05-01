
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import RoleSelection from "@/components/auth/RoleSelection";
import AuthFormContainer from "@/components/auth/AuthFormContainer";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

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
        <motion.div 
          className="text-center glass-card p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Loader2 className="h-12 w-12 text-tedora-sage animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Checking your session...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6BA8A9]/10 to-[#FF9E7D]/10 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/50 to-transparent"></div>
      <div className="absolute top-40 left-10 w-80 h-80 rounded-full bg-tedora-sage/5 blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-tedora-peach/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-12 flex flex-col items-center relative z-10">
        {/* Logo and Tagline with animations */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <img 
              src="/lovable-uploads/47c58735-b6ab-46e9-8705-6f0e66f3ed34.png" 
              alt="TEDora+ Logo" 
              className="h-32 w-auto mx-auto drop-shadow-lg rounded-full"
            />
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-montserrat font-bold mt-4 gradient-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            TEDora+
          </motion.h1>
          
          <motion.p 
            className="text-tedora-sage italic mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            "Trust Everyday Care"
          </motion.p>
        </motion.div>

        {!selectedRole ? (
          <RoleSelection onRoleSelect={handleRoleSelect} />
        ) : (
          <AuthFormContainer 
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
