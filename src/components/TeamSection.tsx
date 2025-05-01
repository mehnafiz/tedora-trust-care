
import { User } from "lucide-react";
import { useEmployeeValidation } from "@/hooks/useEmployeeValidation";
import { Card } from "@/components/ui/card";

const TeamSection = () => {
  const { isValidEmployee, isLoading } = useEmployeeValidation();
  
  const team = [
     {
      name: "MD. Nafiz Ahmed Tanim",
      role: "CEO",
      description: "Lead Coordinator",
      image: "/lovable-uploads/36860606-24da-4223-ad91-f141317ce276.png"
    },
    
    {
      name: "Zahin Iltamas",
      role: "Director",
      description: "Director | Safety Systems Training",
      image: "/lovable-uploads/211ff065-3b7c-4b1b-8acd-38254c7f827b.png"
    },
    {
      name: "Sayma Rahman",
      role: "Consultant & HR Head",
      description: "Childcare Specialist & Client Relations",
      image: "/lovable-uploads/1eb0b1b7-66b9-483a-90d9-5e486566adc4.png"
    },
    {
      name: "Shafin Ahmed",
      role: "CMO",
      description: "Customer Experience Strategist",
      image: "/lovable-uploads/2742d846-9da9-4ccf-976d-8b54cd790173.png"
    }
   
  ];

  if (!isValidEmployee && !isLoading) {
    return (
      <section id="team" className="py-16 bg-tedora-cream/30">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Founders</h2>
          <Card className="p-6 text-center bg-white/90 backdrop-blur-sm">
            <p className="text-gray-600">
              This section is only visible to validated employees. Please contact your administrator for access.
            </p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-16 bg-tedora-cream/30">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Founders</h2>
        
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
                    className="w-full h-full object-cover rounded-full"
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
