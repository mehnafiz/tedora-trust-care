
import { Phone } from "lucide-react";

const StickyCta = () => {
  return (
    <div 
      id="sticky-call-btn"
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-3 transform translate-y-full transition-transform duration-300 z-40"
    >
      <a 
        href="tel:+8801889357506"
        className="bg-tedora-sage text-white py-3 rounded-lg flex items-center justify-center gap-2 font-semibold w-full"
      >
        <Phone size={18} /> Call Now: +8801889357506
      </a>
    </div>
  );
};

export default StickyCta;
