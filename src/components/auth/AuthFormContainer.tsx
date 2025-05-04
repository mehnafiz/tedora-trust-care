
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ClientAuthForm from "./ClientAuthForm";
import EmployeeAuthForm from "./EmployeeAuthForm";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, UserCheck } from "lucide-react";

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
      className="w-full max-w-lg glass-card p-6 sm:p-8 relative"
    >
      {/* Security badge */}
      <div className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-md">
        <Shield className="text-tedora-sage h-6 w-6" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-3 -left-3 w-16 h-16 bg-tedora-sage/10 rounded-full -z-10"></div>
      <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-tedora-peach/10 rounded-full -z-10"></div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <motion.div
            className="p-2 bg-gray-100/80 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {selectedRole === "client" ? (
              <UserCheck className="h-6 w-6 text-tedora-sage" />
            ) : (
              <UserCheck className="h-6 w-6 text-tedora-peach" />
            )}
          </motion.div>
          <div>
            <motion.h2 
              className="text-xl sm:text-2xl font-montserrat font-bold"
              key={`${selectedRole}-${isSignup}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {selectedRole === "client" 
                ? (isSignup ? "Create Family Account" : "Access Your Account") 
                : "Employee Login"}
            </motion.h2>
            <p className="text-sm text-gray-500">TEDora+ | Trust Everyday Care</p>
          </div>
        </div>
        
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

      {/* Trust indicators */}
      <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-center text-xs text-gray-500 gap-2">
        <Shield className="h-3 w-3" />
        <span>Secure, encrypted connection</span>
      </div>
    </motion.div>
  );
};

export default AuthFormContainer;
