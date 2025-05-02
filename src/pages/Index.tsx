
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
    </div>
  );
};

export default Index;
