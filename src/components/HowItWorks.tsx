import { Phone, UserCheck, Coffee } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Phone className="w-8 h-8 text-tedora-sage" />,
      title: "Book",
      description: "Call/WhatsApp +8801889357506 or Fill Our Form."
    },
    {
      icon: <UserCheck className="w-8 h-8 text-tedora-sage" />,
      title: "Match",
      description: "We Assign a Verified Caregiver Within 2 Hours."
    },
    {
      icon: <Coffee className="w-8 h-8 text-tedora-sage" />,
      title: "Relax",
      description: "24/7 Support – Your Family is Safe with Us."
    }
  ];

  return (
    <section
      id="how-it-works"
      className="py-16 pt-24 bg-gradient-to-br from-tedora-cream/50 via-white to-tedora-cream/30"
    >
      <div className="container mx-auto px-4">
        <h2 className="section-title relative inline-block">
          How It Works
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-tedora-sage to-tedora-peach"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center border border-tedora-sage/10 hover:shadow-2xl transition-all duration-500"
            >
              {/* Icon inside the card */}
              <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-gradient-to-br from-tedora-sage/10 to-tedora-cream/50 flex items-center justify-center shadow-md border border-tedora-sage/20 group-hover:scale-105 transition-transform duration-300">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold font-playfair text-tedora-sage mb-2 group-hover:text-tedora-sage/80 transition-colors">
                {index + 1}. {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
