
import { User } from "lucide-react";

const TeamSection = () => {
  const team = [
    {
      name: "MD. Nafiz Ahmed Tanim",
      role: "CEO",
      description: "CS Student & Lead Care Coordinator",
      image: "/lovable-uploads/36860606-24da-4223-ad91-f141317ce276.png"
    },
    {
      name: "Sayma Rahman",
      role: "HR Head",
      description: "Childcare Specialist & Client Relations",
      image: "" // Placeholder
    },
    {
      name: "Zahin Iltamas",
      role: "Operations",
      description: "Elderly Care Logistics Expert",
      image: "" // Placeholder
    },
    {
      name: "Shafin Ahmed",
      role: "Marketing",
      description: "Customer Experience Strategist",
      image: "" // Placeholder
    },
  ];

  return (
    <section id="team" className="py-16 bg-tedora-cream/30">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Founded by AIUB Students Who Care</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-6 text-center shadow-md card-hover"
            >
              <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4 shadow-md border-4 border-tedora-sage/20 bg-gray-100 flex items-center justify-center">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-gray-400" />
                )}
              </div>
              
              <h3 className="text-xl font-bold font-playfair text-gray-800">{member.name}</h3>
              <p className="text-tedora-sage font-medium mt-1">{member.role}</p>
              <p className="text-gray-600 mt-2">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
