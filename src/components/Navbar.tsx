
import { useState, useEffect } from "react";
import { Menu, Phone, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-white"
    }`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Text */}
        <Link to="/" className="flex items-center">
          <div className="flex items-center space-x-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img 
                src="/lovable-uploads/47c58735-b6ab-46e9-8705-6f0e66f3ed34.png" 
                alt="TEDora+ Logo" 
                className="h-16 md:h-20 w-auto object-contain drop-shadow-md rounded-full"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold gradient-text font-playfair">TEDora+</span>
              <span className="text-sm text-gray-600 -mt-1 italic">Trust Everyday Care</span>
            </div>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {['services', 'how-it-works', 'team'].map((item, index) => (
            <motion.a 
              key={item}
              href={`#${item}`} 
              className="text-gray-700 hover:text-[#6BA8A9] transition-colors relative group"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tedora-sage group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Link to="/login" className="text-gray-700 hover:text-[#6BA8A9] transition-colors flex items-center gap-1 relative group">
              <LogIn size={16} />
              <span>Login</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tedora-sage group-hover:w-full transition-all duration-300"></span>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Button className="bg-[#6BA8A9] hover:bg-[#6BA8A9]/90 text-white rounded-full">
              <Phone size={16} className="mr-2" /> +8801772322383
            </Button>
          </motion.div>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-700 hover:text-[#6BA8A9]"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>
      
      {/* Mobile menu with animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white/95 backdrop-blur-md border-t"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-5 space-y-4">
              {['services', 'how-it-works', 'team'].map((item, index) => (
                <motion.a 
                  key={item}
                  href={`#${item}`} 
                  className="block text-gray-700 hover:text-[#6BA8A9] py-2 border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link 
                  to="/login"
                  className="block text-gray-700 hover:text-[#6BA8A9] flex items-center gap-2 py-2 border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn size={16} /> Login
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button className="w-full bg-[#6BA8A9] hover:bg-[#6BA8A9]/90 text-white rounded-full mt-2">
                  <Phone size={16} className="mr-2" /> Call Now
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
