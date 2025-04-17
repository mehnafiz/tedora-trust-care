
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img 
              src="/lovable-uploads/392329e6-0859-48e9-9da2-7918163f0ee5.png" 
              alt="TEDora+ Logo" 
              className="h-12 md:h-14"
            />
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-gray-700 hover:text-tedora-sage transition-colors">Services</a>
          <a href="#how-it-works" className="text-gray-700 hover:text-tedora-sage transition-colors">How It Works</a>
          <a href="#team" className="text-gray-700 hover:text-tedora-sage transition-colors">Our Team</a>
          <a href="#testimonials" className="text-gray-700 hover:text-tedora-sage transition-colors">Testimonials</a>
          <Button className="bg-tedora-sage hover:bg-tedora-sage/90 text-white">
            <Phone size={16} className="mr-2" /> Call Now
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-700 hover:text-tedora-sage"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-5 space-y-4">
            <a 
              href="#services" 
              className="block text-gray-700 hover:text-tedora-sage"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="#how-it-works" 
              className="block text-gray-700 hover:text-tedora-sage"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#team" 
              className="block text-gray-700 hover:text-tedora-sage"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Team
            </a>
            <a 
              href="#testimonials" 
              className="block text-gray-700 hover:text-tedora-sage"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <Button className="w-full bg-tedora-sage hover:bg-tedora-sage/90 text-white">
              <Phone size={16} className="mr-2" /> Call Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
