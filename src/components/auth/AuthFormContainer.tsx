
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ClientAuthForm from "./ClientAuthForm";
import EmployeeAuthForm from "./EmployeeAuthForm";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface AuthFormContainerProps {
  selectedRole: string;
  onBack: () => void;
  onSuccess: () => void;
}

const AuthFormContainer = ({ selectedRole, onBack, onSuccess }: AuthFormContainerProps) => {
  const [isSignup, setIsSignup] = useState(false);
  const { toast } = useToast();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg glass-card p-8 relative"
    >
      {/* Decorative elements */}
      <div className="absolute -top-3 -left-3 w-16 h-16 bg-tedora-sage/10 rounded-full -z-10"></div>
      <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-tedora-peach/10 rounded-full -z-10"></div>
      
      <div className="flex justify-between items-center mb-8">
        <motion.h2 
          className="text-2xl font-montserrat font-bold"
          key={`${selectedRole}-${isSignup}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selectedRole === "client" 
            ? (isSignup ? "Create Family Account" : "Access Your Account") 
            : "Employee Login"}
        </motion.h2>
        
        <motion.button 
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-tedora-peach flex items-center gap-1 transition-colors"
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <ArrowLeft size={16} />
          Change role
        </motion.button>
      </div>

      {selectedRole === "client" ? (
        <ClientAuthForm 
          isSignup={isSignup} 
          setIsSignup={setIsSignup} 
          onSuccess={onSuccess}
          toast={toast}
        />
      ) : (
        <EmployeeAuthForm onSuccess={onSuccess} />
      )}
    </motion.div>
  );
};

export default AuthFormContainer;
