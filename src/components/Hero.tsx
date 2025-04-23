
import { ArrowRight, Phone, Check } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#FFF9F0] via-white to-[#F2FCE2] pt-16 pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-xl relative">
            {/* Decorative circles */}
            <div className="absolute -left-20 -top-20 w-40 h-40 bg-tedora-sage/10 rounded-full blur-3xl"></div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-tedora-peach/10 rounded-full blur-3xl"></div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair leading-tight">
              Your Family's Safety, 
              <span className="relative">
                Our Priority
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-tedora-sage/20 -rotate-1"></div>
              </span>
              <span className="block mt-2 bg-gradient-to-r from-tedora-sage to-tedora-peach bg-clip-text text-transparent">
                Affordable Care in Dhaka!
              </span>
            </h1>
            
            <p className="text-lg text-gray-700 relative z-10">
              Book Trusted Babysitters & Elderly Caregivers – Verified, Trained, and Available 24/7.
            </p>
            
            <div className="flex flex-wrap gap-3 py-2">
              <div className="trust-badge backdrop-blur-sm">
                <Check size={16} className="text-tedora-sage" />
                <span>100% Background-Checked</span>
              </div>
              <div className="trust-badge backdrop-blur-sm">
                <Check size={16} className="text-tedora-sage" />
                <span>First-Aid Certified</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#services" 
                className="relative group btn-primary"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Now 
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </a>
              <a 
                href="tel:+8801772322383" 
                className="btn-secondary group"
              >
                <Phone size={16} className="transition-transform group-hover:rotate-12" /> Call +8801889357506
              </a>
            </div>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-[4/3] relative">
              <div className="absolute inset-0 grid grid-cols-2">
                <div className="bg-gradient-to-br from-tedora-sage/20 via-tedora-sage/30 to-transparent p-6 flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:backdrop-blur-md">
                  <div className="text-center">
                    <div className="text-2xl font-playfair font-bold text-gray-800 mb-2">Childcare</div>
                    <div className="text-gray-600">Loving care for your little ones</div>
                  </div>
                </div>
                <div className="bg-gradient-to-bl from-tedora-peach/20 via-tedora-peach/30 to-transparent p-6 flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:backdrop-blur-md">
                  <div className="text-center">
                    <div className="text-2xl font-playfair font-bold text-gray-800 mb-2">Elderly Care</div>
                    <div className="text-gray-600">Compassionate support you can trust</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
