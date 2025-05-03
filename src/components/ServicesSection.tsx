import { AlertTriangle, Calendar, PhoneCall, Stethoscope } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

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
          {/* Stethoscope icon at top left */}
          <motion.div 
            className="absolute -top-8 -left-6 sm:-top-7 sm:-left-7 lg:-top-8 lg:-left-8 z-10"
            initial={{ opacity: 0, y: -10, x: -10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="bg-white/80 backdrop-blur-sm p-2 lg:p-3 rounded-full shadow-lg border border-tedora-sage/30 flex items-center justify-center">
              <Stethoscope className="text-tedora-sage w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
            </div>
          </motion.div>

          {/* Service Price Card with Glass Effect */}
          <div className="glass-card overflow-hidden rounded-2xl shadow-xl border border-[#6BA8A9]/20">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gradient-to-r from-[#6BA8A9] to-[#6BA8A9]/90">
                  <TableRow className="border-none">
                    <TableHead className="text-white font-medium py-4 pl-6 text-left">Service</TableHead>
                    <TableHead className="text-white font-medium py-4 text-left">Time Slot</TableHead>
                    <TableHead className="text-white font-medium py-4 text-right pr-6">Price (৳)</TableHead>
                    <TableHead className="text-white font-medium py-4 text-right pr-4 w-16">Call</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service, index) => (
                    <motion.tr 
                      key={index}
                      whileHover={{ backgroundColor: "rgba(255, 158, 125, 0.1)" }}
                      className={`border-b border-[#6BA8A9]/10 transition-colors ${
                        index % 2 === 0 ? "bg-[#F5F5F5]/20" : "bg-white/70"
                      }`}
                    >
                      <TableCell className="py-4 pl-6 font-medium text-gray-800">
                        {service.name}
                      </TableCell>
                      <TableCell className="py-4 text-gray-600">
                        {service.timeSlot}
                      </TableCell>
                      <TableCell className="py-4 text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-bold text-tedora-sage">
                            {service.price}
                          </span>
                          <span className="text-xs text-gray-500">
                            {service.minTime}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 text-right pr-4">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <a href="tel:+8801772322383">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="rounded-full p-1 sm:p-2 border-tedora-peach bg-tedora-peach/10 hover:bg-tedora-peach/20 text-tedora-peach"
                            >
                              <PhoneCall size={16} />
                            </Button>
                          </a>
                        </motion.div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          {/* Doctor image at bottom right */}
          <motion.div 
            className="absolute -bottom-6 -right-4 sm:-bottom-4 sm:-right-2 lg:-bottom-2 lg:right-4 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <img 
              src="/lovable-uploads/b56ff574-88e9-4d7d-abe0-9229542a65bc.png" 
              alt="Cartoon Doctor" 
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain"
              style={{ filter: "drop-shadow(0px 3px 6px rgba(0,0,0,0.2))" }}
            />
          </motion.div>
          
          {/* Promo Disclaimer */}
          <motion.div 
            className="mt-6 sm:mt-8 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl p-3 sm:p-4 flex gap-2 sm:gap-3 items-center shadow-sm"
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
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(107, 168, 169, 0.05) 1px, transparent 0)",
          backgroundSize: "22px 22px"
        }}
      />
    </section>
  );
};

export default ServicesSection;
