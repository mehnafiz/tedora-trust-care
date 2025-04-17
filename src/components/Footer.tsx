
import { Phone, Mail, MapPin, Facebook, Instagram, Star, MessageCircle, Award } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-playfair">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-tedora-peach" />
                <a href="tel:+8801889357506" className="hover:text-tedora-peach transition-colors">
                  +8801889357506
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-tedora-peach" />
                <a href="mailto:tedora.care@gmail.com" className="hover:text-tedora-peach transition-colors">
                  tedora.care@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-tedora-peach mt-1 flex-shrink-0" />
                <span>Serving Gulshan, Banani, Dhanmondi, Uttara & Mirpur.</span>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-playfair">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-tedora-peach transition-colors">Hourly Babysitting</a>
              </li>
              <li>
                <a href="#services" className="hover:text-tedora-peach transition-colors">Full-Day Childcare</a>
              </li>
              <li>
                <a href="#services" className="hover:text-tedora-peach transition-colors">Overnight Care</a>
              </li>
              <li>
                <a href="#services" className="hover:text-tedora-peach transition-colors">Elderly Care</a>
              </li>
              <li>
                <a href="#services" className="hover:text-tedora-peach transition-colors">Weekend Packages</a>
              </li>
            </ul>
          </div>
          
          {/* CTA and Social */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-playfair">Connect With Us</h3>
            
            {/* Social Media */}
            <div className="flex gap-4 mb-6">
              <a 
                href="https://facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-tedora-sage/20 w-10 h-10 rounded-full flex items-center justify-center hover:bg-tedora-sage transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-tedora-sage/20 w-10 h-10 rounded-full flex items-center justify-center hover:bg-tedora-sage transition-colors"
              >
                <Instagram size={18} />
              </a>
              <div className="bg-tedora-sage/20 px-3 rounded-full flex items-center gap-1 hover:bg-tedora-sage transition-colors">
                <Star size={16} fill="#FFB88C" />
                <span>5.0</span>
              </div>
            </div>
            
            {/* Trust Seal */}
            
            {/* Final CTA */}
            <div className="bg-tedora-sage text-white p-4 rounded-lg shadow-lg">
              <p className="font-bold mb-2">Limited Slots Available – Book Your Caregiver Today!</p>
              <a 
                href="tel:+8801889357506"
                className="bg-white text-tedora-sage py-2 px-4 rounded-md inline-flex items-center gap-2 font-semibold hover:bg-gray-100 transition-colors mt-1"
              >
                <Phone size={16} /> Call Now
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} TEDora+ – Trust Everyday Care. All rights reserved.</p>
        </div>
      </div>
      
      {/* WhatsApp Widget */}
      <a 
        href="https://wa.me/8801889357506" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-50"
      >
        <MessageCircle size={24} fill="white" />
      </a>
    </footer>
  );
};

export default Footer;
