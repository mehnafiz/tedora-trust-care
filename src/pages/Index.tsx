
import Navbar from "../components/Navbar";
import UrgencyTimer from "../components/UrgencyTimer";
import Hero from "../components/Hero";
import TeamSection from "../components/TeamSection";
import ServicesSection from "../components/ServicesSection";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import StickyCta from "../components/StickyCta";
import { useEffect, useState } from "react";

const Index = () => {
  // State for dynamic values
  const [caregiverCount, setCaregiverCount] = useState<number>(3);
  const [deadlineHour, setDeadlineHour] = useState<number>(20);
  const [deadlineMinute, setDeadlineMinute] = useState<number>(0);

  // Load saved values from localStorage
  useEffect(() => {
    const storedCaregiverCount = localStorage.getItem("caregiverCount");
    const storedDeadlineHour = localStorage.getItem("deadlineHour");
    const storedDeadlineMinute = localStorage.getItem("deadlineMinute");
    
    if (storedCaregiverCount) setCaregiverCount(Number(storedCaregiverCount));
    if (storedDeadlineHour) setDeadlineHour(Number(storedDeadlineHour));
    if (storedDeadlineMinute) setDeadlineMinute(Number(storedDeadlineMinute));
  }, []);

  // Add a mobile sticky call button
  useEffect(() => {
    const handleScroll = () => {
      const stickyBtn = document.getElementById('sticky-call-btn');
      if (stickyBtn) {
        if (window.scrollY > 300) {
          stickyBtn.classList.remove('translate-y-full');
          stickyBtn.classList.add('translate-y-0');
        } else {
          stickyBtn.classList.add('translate-y-full');
          stickyBtn.classList.remove('translate-y-0');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <UrgencyTimer 
        caregiverCount={caregiverCount}
        deadlineHour={deadlineHour}
        deadlineMinute={deadlineMinute}
      />
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
