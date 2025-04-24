
import { Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const StickyCta = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="md:hidden fixed bottom-6 left-4 right-4 z-40 pointer-events-none"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <motion.div 
            className="glass-card border border-tedora-sage/20 p-4 pointer-events-auto"
            whileTap={{ scale: 0.98 }}
          >
            <a 
              href="tel:+8801772322383"
              className="bg-gradient-to-r from-tedora-sage to-tedora-sage/90 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold w-full"
            >
              <Phone size={18} className="animate-pulse" /> 
              <span>Call Now: +8801772322383</span>
            </a>

            <div className="w-full flex justify-center mt-2">
              <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCta;
