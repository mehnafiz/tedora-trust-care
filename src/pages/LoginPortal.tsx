
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import RoleSelection from "@/components/auth/RoleSelection";
import AuthForm from "@/components/auth/AuthForm";

const LoginPortal = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    
    checkUser();
  }, [navigate]);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  const handleSuccess = () => {
    navigate('/dashboard');
  };

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
