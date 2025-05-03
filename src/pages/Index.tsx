
import { PhoneCall } from "lucide-react";
import Navbar from "../components/Navbar";
import UrgencyTimer from "../components/UrgencyTimer";
import Hero from "../components/Hero";
import TeamSection from "../components/TeamSection";
import ServicesSection from "../components/ServicesSection";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import StickyCta from "../components/StickyCta";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <UrgencyTimer />
      <Navbar />
      <Hero />
      <ServicesSection />
      <HowItWorks />
      <TeamSection />
      <Testimonials />
      <Footer />
      <StickyCta />
      
      {/* Fixed Contact CTA - improved for better visibility and mobile responsiveness */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-tedora-sage to-tedora-peach p-2 sm:p-3 text-white text-center shadow-xl z-30">
        <div className="container mx-auto flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-1 sm:gap-2">
          <p className="text-xs sm:text-sm font-medium">For the fastest service, call us directly!</p>
          <a 
            href="tel:+8801772322383" 
            className="bg-white text-tedora-sage hover:bg-white/90 px-3 sm:px-4 py-1 sm:py-2 rounded-md font-medium text-xs sm:text-sm flex items-center gap-1 animate-pulse"
          >
            <PhoneCall className="h-3 w-3 sm:h-4 sm:w-4" />
            Call Now: +8801772322383
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
