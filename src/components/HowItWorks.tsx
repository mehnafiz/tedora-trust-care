
import { Phone, UserCheck, Coffee } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-[#6BA8A9]" />,
      title: "Book",
      description: "Call/WhatsApp +8801772322383 or Fill Our Form."
    },
    {
      icon: <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-[#6BA8A9]" />,
      title: "Match",
      description: "We Assign a Verified Caregiver Within 2 Hours."
    },
    {
      icon: <Coffee className="w-6 h-6 sm:w-8 sm:h-8 text-[#6BA8A9]" />,
      title: "Relax",
      description: "24/7 Support – Your Family is Safe with Us."
    }
  ];

  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#F5F5F5] via-white to-[#F5F5F5]/30 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-tedora-sage/5 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-tedora-peach/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-16"
        >
          <h2 className="section-title relative inline-block font-montserrat">
            How It Works
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#6BA8A9] to-[#FF9E7D]"></div>
          </h2>
          
          <p className="text-center text-gray-600 mt-6 sm:mt-8 max-w-2xl mx-auto px-2">
            We've simplified the process to get you the care you need quickly and efficiently. 
            Just three easy steps to peace of mind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group glass-card p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-500"
            >
              {/* Icon inside the card with pulsing animation */}
              <div className="relative mx-auto mb-4 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#6BA8A9]/10 to-[#F5F5F5]/50 flex items-center justify-center shadow-md border border-[#6BA8A9]/20 group-hover:scale-105 transition-transform duration-300">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.8 }}
                >
                  {step.icon}
                </motion.div>
                
                <div className="absolute -right-1 -top-1 w-5 h-5 sm:w-6 sm:h-6 bg-tedora-peach rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm border-2 border-white">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-montserrat text-[#6BA8A9] mb-2 sm:mb-3 group-hover:text-[#6BA8A9]/80 transition-colors">
                {step.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed font-nunito text-sm sm:text-base">{step.description}</p>
              
              {/* Decorative underline that appears on hover */}
              <div className="h-0.5 w-0 bg-tedora-peach mt-3 sm:mt-4 mx-auto group-hover:w-1/3 transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
        
        {/* Animated divider */}
        <div className="animated-divider mt-10 sm:mt-16"></div>
      </div>
    </section>
  );
};

export default HowItWorks;
