
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ClientAuthForm from "./ClientAuthForm";
import EmployeeAuthForm from "./EmployeeAuthForm";

interface AuthFormContainerProps {
  selectedRole: string;
  onBack: () => void;
  onSuccess: () => void;
}

const AuthFormContainer = ({ selectedRole, onBack, onSuccess }: AuthFormContainerProps) => {
  const [isSignup, setIsSignup] = useState(false);
  const { toast } = useToast();

  return (
    <div className="w-full max-w-lg bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-[#6BA8A9]/10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-montserrat font-bold">
          {selectedRole === "client" 
            ? (isSignup ? "Create Family Account" : "Access Your Account") 
            : "Employee Login"}
        </h2>
        <button 
          onClick={onBack}
          className="text-xs text-gray-500 hover:text-[#FF9E7D]"
        >
          ← Change role
        </button>
      </div>

      {selectedRole === "client" ? (
        <ClientAuthForm 
          isSignup={isSignup} 
          setIsSignup={setIsSignup} 
          onSuccess={onSuccess}
          toast={toast}
        />
      ) : (
        <EmployeeAuthForm 
          onSuccess={onSuccess}
          toast={toast}
        />
      )}
    </div>
  );
};

export default AuthFormContainer;
