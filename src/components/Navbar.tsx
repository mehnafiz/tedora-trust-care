
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
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
    }`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Text */}
        <Link to="/" className="flex items-center">
          <div className="flex items-center space-x-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative overflow-hidden rounded-full bg-gradient-to-r from-tedora-teal to-tedora-tealLight p-0.5 shadow-md"
            >
              <div className="bg-white rounded-full p-1">
                <img 
                  src="/lovable-uploads/73132813-1a1f-4e1d-9875-5f1998948f10.png" 
                  alt="TEDora+ Logo" 
                  className="h-16 w-16 md:h-16 md:w-16 object-contain"
                />
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-tedora-teal font-playfair">TEDora+</span>
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
              className="text-gray-700 hover:text-tedora-teal transition-colors relative group"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-tedora-teal to-tedora-gold group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Link to="/login" className="text-gray-700 hover:text-tedora-teal transition-colors flex items-center gap-1 relative group">
              <LogIn size={16} />
              <span>Login</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-tedora-teal to-tedora-gold group-hover:w-full transition-all duration-300"></span>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Button className="bg-gradient-to-r from-tedora-teal to-tedora-tealLight hover:from-tedora-tealLight hover:to-tedora-teal text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300">
              <Phone size={16} className="mr-2" /> +8801772322383
            </Button>
          </motion.div>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-tedora-teal hover:bg-tedora-teal/10 rounded-full"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>
      
      {/* Mobile menu with animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white/98 backdrop-blur-md border-t border-tedora-teal/10 shadow-lg"
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
                  className="block text-gray-700 hover:text-tedora-teal py-2 border-b border-gray-100"
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
                  className="block text-gray-700 hover:text-tedora-teal flex items-center gap-2 py-2 border-b border-gray-100"
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
                <Button className="w-full bg-gradient-to-r from-tedora-teal to-tedora-tealLight hover:from-tedora-tealLight hover:to-tedora-teal text-white rounded-full mt-2 shadow-md">
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
