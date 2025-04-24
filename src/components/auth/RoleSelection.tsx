
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface RoleSelectionProps {
  onRoleSelect: (role: string) => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-montserrat font-bold text-center mb-8">Welcome! Choose your role</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-[#6BA8A9]/20 flex flex-col items-center transition-all hover:shadow-xl"
          onClick={() => onRoleSelect("client")}
        >
          <img src="https://img.icons8.com/bubbles/100/000000/user.png" alt="Client" className="h-24 w-24 mb-4" />
          <span className="text-lg font-montserrat font-semibold">I'm a Client/Family</span>
          <p className="text-sm text-gray-500 mt-2">Register or login as a client</p>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-[#FF9E7D]/20 flex flex-col items-center transition-all hover:shadow-xl"
          onClick={() => onRoleSelect("employee")}
        >
          <img src="https://img.icons8.com/bubbles/100/000000/nurse-female.png" alt="Employee" className="h-24 w-24 mb-4" />
          <span className="text-lg font-montserrat font-semibold">I'm a Caregiver/Employee</span>
          <p className="text-sm text-gray-500 mt-2">Authorized staff only</p>
        </motion.button>
      </div>
    </div>
  );
};

export default RoleSelection;
