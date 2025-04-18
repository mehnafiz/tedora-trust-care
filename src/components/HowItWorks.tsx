import { Phone, UserCheck, Coffee } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Phone className="w-10 h-10 text-tedora-sage" />,
      title: "Book",
      description: "Call/WhatsApp +8801889357506 or Fill Our Form."
    },
    {
      icon: <UserCheck className="w-10 h-10 text-tedora-sage" />,
      title: "Match",
      description: "We Assign a Verified Caregiver Within 2 Hours."
    },
    {
      icon: <Coffee className="w-10 h-10 text-tedora-sage" />,
      title: "Relax",
      description: "24/7 Support – Your Family is Safe with Us."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 pt-24 bg-gradient-to-br from-tedora-cream/50 via-white to-tedora-cream/30">
      <div className="container mx-auto px-4">
        <h2 className="section-title relative inline-block">
          How It Works
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-tedora-sage to-tedora-peach"></div>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-tedora-sage/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-tedora-peach/5 rounded-full blur-2xl"></div>
          </div>
          
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group bg-white/80 backdrop-blur-sm p-6 pt-16 rounded-xl shadow-lg text-center card-hover relative overflow-hidden border border-tedora-sage/10"
            >
              <div className="absolute -top-12 right-0 w-32 h-32 bg-gradient-to-br from-tedora-sage/10 to-transparent rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-white to-tedora-cream/30 w-16 h-16 rounded-full flex items-center justify-center shadow-md border-2 border-tedora-sage/20 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              
              <h3 className="mt-8 text-xl font-bold font-playfair text-tedora-sage group-hover:text-tedora-sage/80 transition-colors">
                {index + 1}. {step.title}
              </h3>
              <p className="mt-3 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
