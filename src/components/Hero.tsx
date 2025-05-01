
import { ArrowRight, Phone, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative pt-20 pb-24 overflow-hidden">
      {/* Background gradient and shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF9F0] via-white to-[#F2FCE2] -z-10"></div>
      <div className="absolute top-1/4 left-20 w-96 h-96 bg-tedora-sage/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-tedora-peach/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="space-y-6 max-w-xl relative"
            variants={containerVariants}
          >
            {/* Sparkle animations */}
            <div className="sparkle absolute top-0 left-10" style={{ animationDelay: '0.5s' }}></div>
            <div className="sparkle absolute top-20 right-0" style={{ animationDelay: '1.2s' }}></div>
            <div className="sparkle absolute bottom-10 left-20" style={{ animationDelay: '0.8s' }}></div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair leading-tight"
            >
              <span className="inline-flex items-center">
                Your Family's Safety, 
                <motion.div 
                  className="ml-2"
                  animate={{ rotate: [0, -2, 0, 2, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles size={32} className="text-yellow-400" />
                </motion.div>
              </span>
              <span className="relative block mt-2">
                Our Priority
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-tedora-sage/20 -rotate-1"></div>
              </span>
              <span className="block mt-4 gradient-text">
                Affordable Care in Dhaka!
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-700 relative z-10"
            >
              Book Trusted Babysitters & Elderly Caregivers – Verified, Trained, and Available 24/7 for your peace of mind.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-3 py-2"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="trust-badge backdrop-blur-sm"
              >
                <Check size={16} className="text-tedora-sage" />
                <span>100% Background-Checked</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="trust-badge backdrop-blur-sm"
              >
                <Check size={16} className="text-tedora-sage" />
                <span>First-Aid Certified</span>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.a 
                href="#services" 
                className="relative group btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Now 
                  <ArrowRight 
                    size={16} 
                    className="transition-transform group-hover:translate-x-1" 
                  />
                </span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-tedora-sage to-tedora-sage/80 rounded-2xl -z-10"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.a>
              <motion.a 
                href="tel:+8801772322383" 
                className="btn-secondary group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone 
                  size={16} 
                  className="transition-transform group-hover:rotate-12" 
                /> 
                Call +8801772322383
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <motion.div 
              className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 grid grid-cols-2">
                <motion.div 
                  className="bg-gradient-to-br from-tedora-sage/20 via-tedora-sage/30 to-transparent p-6 flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:backdrop-blur-md"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="glass-card p-6 w-full max-w-[200px] text-center">
                    <div className="flex justify-center mb-4">
                      <motion.div 
                        className="w-16 h-16 bg-tedora-sage/20 rounded-full flex items-center justify-center"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <img 
                          src="/lovable-uploads/211ff065-3b7c-4b1b-8acd-38254c7f827b.png" 
                          alt="Childcare" 
                          className="h-10 w-auto rounded-full" 
                        />
                      </motion.div>
                    </div>
                    <div className="text-2xl font-playfair font-bold text-gray-800 mb-2">Childcare</div>
                    <div className="text-gray-600">Loving care for your little ones</div>
                  </div>
                </motion.div>
                <motion.div 
                  className="bg-gradient-to-bl from-tedora-peach/20 via-tedora-peach/30 to-transparent p-6 flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:backdrop-blur-md"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="glass-card p-6 w-full max-w-[200px] text-center">
                    <div className="flex justify-center mb-4">
                      <motion.div 
                        className="w-16 h-16 bg-tedora-peach/20 rounded-full flex items-center justify-center"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                      >
                        <img 
                          src="/lovable-uploads/2742d846-9da9-4ccf-976d-8b54cd790173.png" 
                          alt="Elderly Care" 
                          className="h-10 w-auto rounded-full" 
                        />
                      </motion.div>
                    </div>
                    <div className="text-2xl font-playfair font-bold text-gray-800 mb-2">Elderly Care</div>
                    <div className="text-gray-600">Compassionate support you can trust</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-tedora-sage/10 rounded-full"></div>
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-tedora-peach/10 rounded-full"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
