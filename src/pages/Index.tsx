
import { PhoneCall } from "lucide-react";
import { lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import UrgencyTimer from "../components/UrgencyTimer";
import Hero from "../components/Hero";
import { Skeleton } from "@/components/ui/skeleton";

// Use lazy loading for non-critical components
const TeamSection = lazy(() => import("../components/TeamSection"));
const ServicesSection = lazy(() => import("../components/ServicesSection"));
const MonthlyPackages = lazy(() => import("../components/MonthlyPackages"));
const HowItWorks = lazy(() => import("../components/HowItWorks"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const Footer = lazy(() => import("../components/Footer"));
const StickyCta = lazy(() => import("../components/StickyCta"));

// Fallback loading component
const SectionLoader = () => (
  <div className="py-12">
    <div className="container mx-auto px-4">
      <Skeleton className="h-10 w-1/3 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Skeleton className="h-64 rounded-lg" />
        <Skeleton className="h-64 rounded-lg hidden md:block" />
        <Skeleton className="h-64 rounded-lg hidden lg:block" />
      </div>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <UrgencyTimer />
      <Navbar />
      <Hero />
      
      <Suspense fallback={<SectionLoader />}>
        <ServicesSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <MonthlyPackages />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <HowItWorks />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <TeamSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<div className="h-32" />}>
        <Footer />
      </Suspense>
      
      <Suspense fallback={null}>
        <StickyCta />
      </Suspense>
      
      {/* Fixed Contact CTA with improved styling and optimized rendering */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-tedora-teal to-tedora-tealLight p-2 sm:p-3 text-white text-center shadow-xl z-30">
        <div className="container mx-auto flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-1 sm:gap-2">
          <p className="text-xs sm:text-sm font-medium">For the fastest service, call us directly!</p>
          <a 
            href="tel:+8801772322383" 
            className="bg-white text-tedora-teal hover:bg-white/90 px-3 sm:px-4 py-1 sm:py-2 rounded-md font-medium text-xs sm:text-sm flex items-center gap-1 animate-pulse transition-all duration-300 hover:scale-105"
          >
            <PhoneCall className="h-3 w-3 sm:h-4 sm:w-4" />
            Call Now: +8801772322383
          </a>
        </div>
      </div>
      
      {/* Scroll-to-top button with improved performance */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-16 right-4 sm:bottom-20 sm:right-6 z-30 bg-white p-2 sm:p-3 rounded-full shadow-lg border border-tedora-teal/30 opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tedora-teal">
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </button>
    </div>
  );
};

export default Index;
