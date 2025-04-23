
import { Card, CardContent } from '@/components/ui/card';

interface Service {
  name: string;
  timeSlot: string;
  price: string;
}

interface ServicesCardProps {
  services: Service[];
}

export const ServicesCard = ({ services }: ServicesCardProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-[#6BA8A9]/20 mt-6">
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {services.map((service, index) => (
          <div key={index} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <h3 className="font-semibold text-lg text-[#6BA8A9]">{service.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{service.timeSlot}</p>
            <p className="text-lg font-bold mt-2">₹{service.price}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
