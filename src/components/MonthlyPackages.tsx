
import { useState } from "react";
import { useMonthlyPackages } from "@/hooks/useMonthlyPackages";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, CheckCircle2, XCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const MonthlyPackages = () => {
  const { packages, loading, error } = useMonthlyPackages();
  const [activeTab, setActiveTab] = useState<string>("child");
  
  if (loading) {
    return (
      <div className="py-16 bg-gradient-to-br from-white via-[#F9F7F4] to-[#F5F5F5]/80">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Monthly Care Packages</h2>
          <div className="flex justify-center">
            <div className="flex space-x-4">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="w-72 h-96 bg-gray-100 rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-16 bg-gradient-to-br from-white via-[#F9F7F4] to-[#F5F5F5]/80">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">Failed to load packages. Please try again later.</p>
        </div>
      </div>
    );
  }
  
  const childPackages = packages.filter(pkg => pkg.care_type === 'child');
  const elderlyPackages = packages.filter(pkg => pkg.care_type === 'elderly');
  
  return (
    <section
      id="monthly-packages"
      className="py-16 sm:py-20 bg-gradient-to-br from-white via-[#F9F7F4] to-[#F5F5F5]/80 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat">Monthly Care Packages</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our range of affordable monthly care packages designed for both childcare and elderly care needs.
          </p>
          
          <Tabs
            defaultValue="child"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-8"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-[400px] grid-cols-2">
                <TabsTrigger value="child">Child Care</TabsTrigger>
                <TabsTrigger value="elderly">Elderly Care</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="child" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {childPackages.map((pkg, index) => (
                  <PackageCard key={pkg.id} pkg={pkg} index={index} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="elderly" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {elderlyPackages.map((pkg, index) => (
                  <PackageCard key={pkg.id} pkg={pkg} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      
      {/* Background pattern */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(107, 168, 169, 0.05) 1px, transparent 0)",
          backgroundSize: "22px 22px"
        }}
      />
    </section>
  );
};

interface PackageCardProps {
  pkg: any;
  index: number;
}

const PackageCard = ({ pkg, index }: PackageCardProps) => {
  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const period = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}${period}`;
    } catch (e) {
      return timeString;
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className={`overflow-hidden ${
        pkg.tier === 'premium' 
          ? 'border-tedora-peach shadow-lg' 
          : pkg.tier === 'standard'
            ? 'border-tedora-sage shadow-md'
            : 'border-gray-200 shadow-sm'
      }`}>
        <CardHeader className={`pb-4 ${
          pkg.tier === 'premium' 
            ? 'bg-gradient-to-r from-tedora-peach to-orange-400 text-white' 
            : pkg.tier === 'standard'
              ? 'bg-gradient-to-r from-tedora-sage to-tedora-sage/70 text-white'
              : 'bg-gray-50 text-gray-800'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold capitalize">
                {pkg.tier} Package
              </CardTitle>
              <CardDescription className={`mt-1 ${
                pkg.tier === 'basic' ? 'text-gray-600' : 'text-white/80'
              }`}>
                {pkg.care_type === 'child' ? 'Child Care' : 'Elderly Care'}
              </CardDescription>
            </div>
            {pkg.tier === 'premium' && (
              <Badge className="bg-white text-tedora-peach hover:bg-white/90">
                Popular
              </Badge>
            )}
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold">
              {formatPrice(pkg.price)}
            </span>
            <span className="text-sm font-medium ml-1">/month</span>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <ul className="space-y-3">
            <li className="flex items-start">
              <Clock className="h-5 w-5 text-tedora-sage mr-2 mt-0.5" />
              <span>
                {pkg.is_24_hour 
                  ? <span className="font-medium">24-hour service</span>
                  : <span>Service from {formatTime(pkg.hours_start)} to {formatTime(pkg.hours_end)}</span>
                }
              </span>
            </li>
            
            <li className="flex items-start">
              <Calendar className="h-5 w-5 text-tedora-sage mr-2 mt-0.5" />
              <span>{pkg.weekend_days} Weekend {pkg.weekend_days > 1 ? 'Days' : 'Day'} Included</span>
            </li>
            
            <li className="flex items-start">
              {pkg.includes_medication 
                ? <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                : <XCircle className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
              }
              <span className={pkg.includes_medication ? '' : 'text-gray-500'}>
                Medication Management
              </span>
            </li>
            
            <li className="flex items-start">
              {pkg.includes_exercise 
                ? <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                : <XCircle className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
              }
              <span className={pkg.includes_exercise ? '' : 'text-gray-500'}>
                Exercise & Activities
              </span>
            </li>
          </ul>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Button 
              className={`w-full ${
                pkg.tier === 'premium' 
                  ? 'bg-tedora-peach hover:bg-tedora-peach/90' 
                  : pkg.tier === 'standard'
                    ? 'bg-tedora-sage hover:bg-tedora-sage/90'
                    : 'bg-gray-700 hover:bg-gray-800'
              }`}
            >
              Call to Book
            </Button>
            <Button 
              variant="outline" 
              className="w-full mt-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => window.location.href = "tel:+8801772322383"}
            >
              <Phone className="h-4 w-4 mr-2" />
              +8801772322383
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MonthlyPackages;
