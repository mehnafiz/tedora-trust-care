
import { ArrowRight, Phone, Check } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-tedora-cream to-white pt-16 pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-6 max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair leading-tight text-gray-800">
              Your Family's Safety, Our Priority – 
              <span className="text-tedora-sage">Affordable Care in Dhaka!</span>
            </h1>
            
            <p className="text-lg text-gray-700">
              Book Trusted Babysitters & Elderly Caregivers – Verified, Trained, and Available 24/7.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 py-2">
              <div className="trust-badge">
                <Check size={16} className="text-tedora-sage" />
                <span>100% Background-Checked</span>
              </div>
              <div className="trust-badge">
                <Check size={16} className="text-tedora-sage" />
                <span>First-Aid Certified</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#services" 
                className="btn-primary flex items-center gap-2"
              >
                Book Now <ArrowRight size={16} />
              </a>
              <a 
                href="tel:+8801889357506" 
                className="btn-secondary flex items-center gap-2"
              >
                <Phone size={16} /> Call +8801889357506
              </a>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative rounded-xl overflow-hidden shadow-xl">
            <div className="aspect-[4/3] relative">
              <div className="absolute inset-0 grid grid-cols-2">
                <div className="bg-gradient-to-br from-tedora-sage/20 to-tedora-sage/40 p-6 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-center text-gray-600 font-medium">
                      Loving childcare for your little ones
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-bl from-tedora-peach/20 to-tedora-peach/40 p-6 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-center text-gray-600 font-medium">
                      Compassionate elderly care you can trust
                    </div>
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
