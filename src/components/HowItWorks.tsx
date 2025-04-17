
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
    <section id="how-it-works" className="py-16 bg-tedora-cream/50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center card-hover relative"
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-md border-2 border-tedora-sage/20">
                {step.icon}
              </div>
              
              <h3 className="mt-8 text-xl font-bold font-playfair text-tedora-sage">
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
