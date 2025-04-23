
import { Phone, UserCheck, Coffee } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Phone className="w-8 h-8 text-[#6BA8A9]" />,
      title: "Book",
      description: "Call/WhatsApp +8801772322383 or Fill Our Form."
    },
    {
      icon: <UserCheck className="w-8 h-8 text-[#6BA8A9]" />,
      title: "Match",
      description: "We Assign a Verified Caregiver Within 2 Hours."
    },
    {
      icon: <Coffee className="w-8 h-8 text-[#6BA8A9]" />,
      title: "Relax",
      description: "24/7 Support – Your Family is Safe with Us."
    }
  ];

  return (
    <section
      id="how-it-works"
      className="py-16 pt-24 bg-gradient-to-br from-[#F5F5F5] via-white to-[#F5F5F5]/30"
    >
      <div className="container mx-auto px-4">
        <h2 className="section-title relative inline-block font-montserrat">
          How It Works
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#6BA8A9] to-[#FF9E7D]"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center border border-[#6BA8A9]/10 hover:shadow-2xl transition-all duration-500"
            >
              {/* Icon inside the card */}
              <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#6BA8A9]/10 to-[#F5F5F5]/50 flex items-center justify-center shadow-md border border-[#6BA8A9]/20 group-hover:scale-105 transition-transform duration-300">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold font-montserrat text-[#6BA8A9] mb-2 group-hover:text-[#6BA8A9]/80 transition-colors">
                {index + 1}. {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-nunito">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
