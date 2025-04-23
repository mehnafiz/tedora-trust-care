
import { AlertTriangle, Stethoscope } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

const ServicesSection = () => {
  const isMobile = useIsMobile();
  
  const services = [
    {
      name: "Hourly Babysitting",
      timeSlot: "7 AM – 6 PM",
      price: "249/hour(Min: 3hr)"
    }, 
    {
      name: "Hourly Babysitting(Night)",
      timeSlot: "6 PM – 10 PM",
      price: "299/hour(Min: 2hr)"
    },
    {
      name: "Full-Day Childcare",
      timeSlot: "8 AM – 6 PM",
      price: "1,499/day"
    },
    {
      name: "Overnight Care",
      timeSlot: "10 PM – 6 AM",
      price: "1,999/night"
    },
    {
      name: "Elderly Care (Daily)",
      timeSlot: "8 AM – 8 PM",
      price: "1,799/day"
    },
    {
      name: "Weekend Package",
      timeSlot: "Fri + Sat (Hourly)",
      price: "399/hour"
    }
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title font-montserrat">Transparent Pricing for Dhaka Families</h2>
        
        <div className="max-w-3xl mx-auto relative">
          {/* Stethoscope Icon */}
          <div className="absolute -top-12 -left-4 md:-left-10 transform rotate-12 text-primary-500 z-10">
            <div className="relative">
              <Stethoscope size={isMobile ? 40 : 56} className="text-[#6BA8A9]" strokeWidth={1.5} />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="w-3 h-3 bg-[#FF9E7D] rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white via-[#F5F5F5] to-[#F5F5F5]/80 rounded-xl shadow-lg overflow-hidden border border-[#6BA8A9]/20 backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#6BA8A9] to-[#6BA8A9]/90 text-white">
                  <tr>
                    <th className="py-4 px-3 md:px-6 text-left">Service</th>
                    <th className="py-4 px-2 md:px-6 text-left">Time Slot</th>
                    <th className="py-4 px-3 md:px-6 text-right">Price (BDT)</th>
                    <th className="py-4 px-2 md:px-4 text-right">Book</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <motion.tr 
                      key={index}
                      whileHover={{ backgroundColor: "rgba(255, 158, 125, 0.1)" }}
                      className={`border-b border-[#6BA8A9]/10 transition-colors ${
                        index % 2 === 0 ? "bg-[#F5F5F5]/20" : "bg-white"
                      }`}
                    >
                      <td className="py-4 px-3 md:px-6 font-medium">{service.name}</td>
                      <td className="py-4 px-2 md:px-6 text-gray-600 text-sm md:text-base">{service.timeSlot}</td>
                      <td className="py-4 px-3 md:px-6 text-right font-semibold whitespace-nowrap">{service.price}</td>
                      <td className="py-4 px-2 md:px-4 text-right">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-1.5 bg-[#FF9E7D]/10 hover:bg-[#FF9E7D]/20 text-[#FF9E7D] rounded-full transition-colors"
                        >
                          📅
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-lg p-4 flex gap-3 items-start shadow-sm">
            <AlertTriangle size={20} className="text-[#FF9E7D] mt-1 flex-shrink-0" />
            <p className="text-red-700 font-medium">
              First 20 Clients Get 15% OFF – Call Now at +8801772322383!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
