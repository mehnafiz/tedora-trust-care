
import { AlertTriangle } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      name: "Hourly Babysitting",
      timeSlot: "7 AM – 6 PM",
      price: "249/hour(Min: 3hr)"
    }, 
    {
      name: "Hourly Babysitting(Night)",
      timeSlot: "6 PM – 10 PM",
      price: "299/hour(Min: 2hr)"
    },
    {
      name: "Full-Day Childcare",
      timeSlot: "8 AM – 6 PM",
      price: "1,499/day"
    },
    {
      name: "Overnight Care",
      timeSlot: "10 PM – 6 AM",
      price: "1,999/night"
    },
    {
      name: "Elderly Care (Daily)",
      timeSlot: "8 AM – 8 PM",
      price: "1,799/day"
    },
    {
      name: "Weekend Package",
      timeSlot: "Fri + Sat (Hourly)",
      price: "399/hour"
    }
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Transparent Pricing for Dhaka Families</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-tedora-sage text-white">
                <tr>
                  <th className="py-4 px-6 text-left">Service</th>
                  <th className="py-4 px-6 text-left">Time Slot</th>
                  <th className="py-4 px-6 text-right">Price (BDT)</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr 
                    key={index}
                    className={`border-b border-gray-100 hover:bg-tedora-cream/10 transition-colors ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="py-4 px-6 font-medium">{service.name}</td>
                    <td className="py-4 px-6 text-gray-600">{service.timeSlot}</td>
                    <td className="py-4 px-6 text-right font-semibold">{service.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-6 bg-red-50 border border-red-100 rounded-lg p-4 flex gap-3 items-start">
            <AlertTriangle size={20} className="text-red-500 mt-1 flex-shrink-0" />
            <p className="text-red-700 font-medium">
              First 20 Clients Get 15% OFF – Call Now!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
