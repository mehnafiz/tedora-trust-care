
import { AlertTriangle, Calendar, PhoneCall } from "lucide-react";
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
      className="py-20 bg-gradient-to-br from-white via-[#F9F7F4] to-[#F5F5F5]/80"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title font-montserrat mb-4 text-center">
            Transparent Pricing for Dhaka Families
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
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
                    <th className="py-4 px-3 md:px-6 text-left">Service</th>
                    <th className="py-4 px-2 md:px-6 text-left">Time Slot</th>
                    <th className="py-4 px-3 md:px-6 text-right">Price (৳)</th>
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
                      <td className="py-4 px-3 md:px-6 text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-bold text-tedora-sage">{service.price}</span>
                          <span className="text-xs text-gray-500">{service.minTime}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2 md:px-4 text-right">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <a href="tel:+8801772322383">
                            <Button size="sm" variant="outline" className="rounded-full p-2 border-tedora-peach bg-tedora-peach/10 hover:bg-tedora-peach/20 text-tedora-peach">
                              <PhoneCall size={18} />
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
            className="mt-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl p-5 flex gap-3 items-center shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="p-2 bg-white/80 rounded-full">
              <AlertTriangle size={20} className="text-[#FF9E7D]" />
            </div>
            <div>
              <p className="text-red-700 font-medium">
                First 20 Clients Get 15% OFF!
              </p>
              <p className="text-red-600 text-sm">
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
