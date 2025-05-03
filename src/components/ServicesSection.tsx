
import { AlertTriangle, Calendar, PhoneCall, Stethoscope } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const isMobile = useIsMobile();
  
  const services = [
    {
      name: "Hourly Babysitting",
      timeSlot: "7 AM – 6 PM",
      price: "249/hour",
      minTime: "(Min: 3hr)"
    }, 
    {
      name: "Hourly Babysitting (Night)",
      timeSlot: "6 PM – 10 PM",
      price: "299/hour",
      minTime: "(Min: 2hr)"
    },
    {
      name: "Full-Day Childcare",
      timeSlot: "8 AM – 6 PM",
      price: "999/day",
      minTime: ""
    },
    {
      name: "Overnight Care",
      timeSlot: "10 PM – 6 AM",
      price: "1,499/night",
      minTime: ""
    },
    {
      name: "Elderly Care (Daily)",
      timeSlot: "8 AM – 8 PM",
      price: "1,199/day",
      minTime: ""
    },
    {
      name: "Weekend Package",
      timeSlot: "Fri + Sat (Hourly)",
      price: "399/hour",
      minTime: ""
    }
  ];

  return (
    <section 
      id="services" 
      className="py-16 sm:py-20 bg-gradient-to-br from-white via-[#F9F7F4] to-[#F5F5F5]/80 relative overflow-hidden"
    >
      {/* Stethoscope icon at top left */}
      <motion.div 
        className="absolute -top-2 -left-2 lg:top-4 lg:left-8 z-10 hidden sm:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-full shadow-lg border border-tedora-sage/20">
          <Stethoscope className="text-tedora-sage w-10 h-10 lg:w-14 lg:h-14" />
        </div>
      </motion.div>
      
      {/* Cartoon doctor at bottom right */}
      <motion.div 
        className="absolute -bottom-4 -right-4 md:bottom-0 md:right-2 lg:bottom-4 lg:right-8 z-10 hidden sm:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-lg border border-tedora-peach/30 flex items-center justify-center">
          <div className="relative">
            <svg width="90" height="90" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              {/* Face */}
              <circle cx="50" cy="50" r="45" fill="#FFD7B5" />
              {/* Hair */}
              <path d="M50 10 C30 10 15 25 15 45 C15 25 30 5 50 5 C70 5 85 25 85 45 C85 25 70 10 50 10" fill="#8B4513" />
              {/* Eyes */}
              <circle cx="35" cy="40" r="5" fill="#333" />
              <circle cx="65" cy="40" r="5" fill="#333" />
              {/* Smile */}
              <path d="M35 60 Q50 75 65 60" fill="none" stroke="#333" strokeWidth="3" />
              {/* Doctor coat */}
              <path d="M25 95 L25 70 L75 70 L75 95" fill="#fff" stroke="#eee" strokeWidth="2" />
              {/* Stethoscope */}
              <path d="M40 75 Q 50 85 60 75" fill="none" stroke="#6BA8A9" strokeWidth="3" />
              <circle cx="40" cy="75" r="3" fill="#6BA8A9" />
            </svg>
            {/* Happy face expression with animated blinking */}
            <motion.div 
              animate={{ 
                scaleY: [1, 0.1, 1],
                transition: { 
                  repeat: Infinity, 
                  repeatDelay: 3,
                  duration: 0.2
                }
              }}
              className="absolute top-[40px] left-[65px] w-10 h-5 bg-transparent pointer-events-none"
            />
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="section-title font-montserrat mb-4 text-center">
            Transparent Pricing for Dhaka Families
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
            Quality care services at competitive rates. For the fastest service, call us directly at 
            <span className="font-medium text-tedora-sage"> +8801772322383</span>.
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-3xl mx-auto relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Service Price Card with Glass Effect */}
          <div className="glass-card overflow-hidden rounded-xl shadow-xl border border-[#6BA8A9]/30">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#6BA8A9] to-[#6BA8A9]/90 text-white">
                  <tr>
                    <th className="py-3 sm:py-4 px-2 sm:px-3 md:px-6 text-left text-xs sm:text-sm md:text-base">Service</th>
                    <th className="py-3 sm:py-4 px-2 md:px-6 text-left text-xs sm:text-sm md:text-base">Time Slot</th>
                    <th className="py-3 sm:py-4 px-2 sm:px-3 md:px-6 text-right text-xs sm:text-sm md:text-base">Price (৳)</th>
                    <th className="py-3 sm:py-4 px-1 sm:px-2 md:px-4 text-right text-xs sm:text-sm md:text-base">Book</th>
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
                      <td className="py-2 sm:py-4 px-2 sm:px-3 md:px-6 font-medium text-xs sm:text-sm md:text-base">{service.name}</td>
                      <td className="py-2 sm:py-4 px-2 md:px-6 text-gray-600 text-xs sm:text-sm md:text-base">{service.timeSlot}</td>
                      <td className="py-2 sm:py-4 px-2 sm:px-3 md:px-6 text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-bold text-tedora-sage text-xs sm:text-sm md:text-base">{service.price}</span>
                          <span className="text-[10px] sm:text-xs text-gray-500">{service.minTime}</span>
                        </div>
                      </td>
                      <td className="py-2 sm:py-4 px-1 sm:px-2 md:px-4 text-right">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <a href="tel:+8801772322383">
                            <Button size="sm" variant="outline" className="rounded-full p-1 sm:p-2 border-tedora-peach bg-tedora-peach/10 hover:bg-tedora-peach/20 text-tedora-peach">
                              <PhoneCall size={16} className="sm:h-[18px] sm:w-[18px]" />
                            </Button>
                          </a>
                        </motion.div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Promo Disclaimer */}
          <motion.div 
            className="mt-4 sm:mt-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl p-3 sm:p-5 flex gap-2 sm:gap-3 items-center shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="p-1 sm:p-2 bg-white/80 rounded-full">
              <AlertTriangle size={16} className="sm:w-5 sm:h-5 text-[#FF9E7D]" />
            </div>
            <div>
              <p className="text-red-700 font-medium text-xs sm:text-sm md:text-base">
                First 20 Clients Get 15% OFF!
              </p>
              <p className="text-red-600 text-[10px] sm:text-xs md:text-sm">
                Call Now at +8801772322383 for the fastest service.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
