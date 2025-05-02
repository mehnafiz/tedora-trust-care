
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

interface Service {
  name: string;
  timeSlot: string;
  price: string;
}

interface ServicesCardProps {
  services: Service[];
  onBookService?: (serviceName: string) => void;
}

export const ServicesCard = ({ services, onBookService }: ServicesCardProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-[#6BA8A9]/20 shadow-md mt-6">
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className="absolute top-0 right-0 bg-tedora-sage text-white px-2 py-1 text-xs font-medium">
              Popular
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg text-tedora-sage mb-2">{service.name}</h3>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Clock className="h-4 w-4 text-tedora-sage/70" />
                <span>{service.timeSlot}</span>
              </div>
              
              <div className="flex items-center mt-2">
                <div className="text-xl font-bold text-tedora-peach">
                  {/* Fixed: Only show the Taka symbol once */}
                  <span>৳ {service.price}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-100">
                {onBookService && (
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-tedora-sage hover:bg-tedora-sage/90 text-white"
                      onClick={() => onBookService(service.name)}
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Book
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-tedora-peach text-tedora-peach hover:bg-tedora-peach/10"
                      onClick={() => window.location.href = "tel:+8801772322383"}
                    >
                      <PhoneCall className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};
