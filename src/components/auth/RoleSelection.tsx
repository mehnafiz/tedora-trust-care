
import { motion } from "framer-motion";
import { Shield, Users, HeartHandshake } from "lucide-react";

interface RoleSelectionProps {
  onRoleSelect: (role: string) => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-montserrat font-bold text-center mb-4">Welcome to TEDora+</h2>
      <p className="text-center text-gray-600 mb-8">Choose how you'd like to sign in</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.button
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-[#6BA8A9]/20 flex flex-col items-center transition-all hover:shadow-xl relative overflow-hidden group"
          onClick={() => onRoleSelect("client")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-tedora-sage/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="rounded-full bg-tedora-sage/10 p-4 mb-4">
            <Users className="h-10 w-10 text-tedora-sage" />
          </div>
          <span className="text-lg font-montserrat font-semibold">Family Account</span>
          <p className="text-sm text-gray-500 mt-2 text-center">Access family care services and manage your account</p>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-[#FF9E7D]/20 flex flex-col items-center transition-all hover:shadow-xl relative overflow-hidden group"
          onClick={() => onRoleSelect("employee")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-tedora-peach/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="rounded-full bg-tedora-peach/10 p-4 mb-4">
            <HeartHandshake className="h-10 w-10 text-tedora-peach" />
          </div>
          <span className="text-lg font-montserrat font-semibold">Staff Portal</span>
          <p className="text-sm text-gray-500 mt-2 text-center">Access your schedule, client information and reports</p>
          
          {/* Security badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
            <Shield className="h-3 w-3 text-tedora-sage" />
            <span className="text-xs text-tedora-sage font-medium">Secure</span>
          </div>
        </motion.button>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">Need assistance? Call us at <a href="tel:+8801772322383" className="text-tedora-sage font-semibold">+8801772322383</a></p>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
          <Shield size={12} />
          <span>256-bit encrypted connection</span>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
