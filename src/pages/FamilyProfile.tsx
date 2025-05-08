
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Users, Baby, UserRoundCog, HeartPulse, Search, Clock, Calendar, Shield } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMonthlyPackages } from "@/hooks/useMonthlyPackages";

const FamilyProfile = () => {
  const [activeTab, setActiveTab] = useState("family");
  const { packages } = useMonthlyPackages();
  
  const childPackages = packages?.filter(pkg => pkg.care_type === 'child') || [];
  const elderlyPackages = packages?.filter(pkg => pkg.care_type === 'elderly') || [];

  const handleSaveGeneral = () => {
    toast({
      title: "Profile Updated",
      description: "Your family profile information has been saved.",
    });
  };

  const handleAddChild = () => {
    toast({
      title: "Child Added",
      description: "The child profile has been added to your family.",
    });
  };

  const handleAddElderly = () => {
    toast({
      title: "Profile Added",
      description: "The elderly care profile has been added to your family.",
    });
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger 
                value="family" 
                className="flex items-center gap-2 data-[state=active]:bg-tedora-teal data-[state=active]:text-white"
              >
                <Users className="h-4 w-4" />
                <span>Family Details</span>
              </TabsTrigger>
              <TabsTrigger 
                value="children" 
                className="flex items-center gap-2 data-[state=active]:bg-tedora-teal data-[state=active]:text-white"
              >
                <Baby className="h-4 w-4" />
                <span>Children</span>
              </TabsTrigger>
              <TabsTrigger 
                value="elderly" 
                className="flex items-center gap-2 data-[state=active]:bg-tedora-teal data-[state=active]:text-white"
              >
                <HeartPulse className="h-4 w-4" />
                <span>Elderly Care</span>
              </TabsTrigger>
              <TabsTrigger 
                value="preferences" 
                className="flex items-center gap-2 data-[state=active]:bg-tedora-teal data-[state=active]:text-white"
              >
                <UserRoundCog className="h-4 w-4" />
                <span>Preferences</span>
              </TabsTrigger>
              <TabsTrigger 
                value="packages" 
                className="flex items-center gap-2 data-[state=active]:bg-tedora-teal data-[state=active]:text-white"
              >
                <Shield className="h-4 w-4" />
                <span>Care Packages</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="family" className="space-y-6">
              <Card className="border-tedora-teal/20 shadow-md">
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                  <CardDescription>
                    Update your family information and home details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="primary-contact">Primary Contact Name</Label>
                      <Input id="primary-contact" placeholder="Full Name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+8801XXXXXXXXX" defaultValue="+8801772322383" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" placeholder="name@example.com" defaultValue="john.doe@example.com" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alt-contact">Alternative Contact</Label>
                      <Input id="alt-contact" placeholder="Full Name & Relation" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alt-phone">Alternative Phone</Label>
                      <Input id="alt-phone" placeholder="+8801XXXXXXXXX" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">Area</Label>
                      <Select defaultValue="gulshan">
                        <SelectTrigger className="border-tedora-teal/30">
                          <SelectValue placeholder="Select area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gulshan">Gulshan</SelectItem>
                          <SelectItem value="banani">Banani</SelectItem>
                          <SelectItem value="dhanmondi">Dhanmondi</SelectItem>
                          <SelectItem value="bashundhara">Bashundhara</SelectItem>
                          <SelectItem value="uttara">Uttara</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address</Label>
                    <Textarea 
                      id="address" 
                      placeholder="Enter your complete address"
                      defaultValue="House 7, Road 13, Block D, Gulshan, Dhaka"
                      className="min-h-[100px] border-tedora-teal/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="special-instructions">Special Instructions for Caregivers</Label>
                    <Textarea 
                      id="special-instructions" 
                      placeholder="Any special information or instructions caregivers should know about your home"
                      className="min-h-[100px] border-tedora-teal/30"
                    />
                  </div>
                  
                  <Button onClick={handleSaveGeneral} className="bg-tedora-teal hover:bg-tedora-tealLight w-full sm:w-auto">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="children" className="space-y-6">
              <Card className="mb-6 border-tedora-teal/20 shadow-md">
                <CardHeader>
                  <CardTitle>Add Child Profile</CardTitle>
                  <CardDescription>
                    Add information about children who will receive care.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="child-name">Full Name</Label>
                      <Input id="child-name" placeholder="Child's full name" className="border-tedora-teal/30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="child-dob">Date of Birth</Label>
                      <Input id="child-dob" type="date" className="border-tedora-teal/30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="child-gender">Gender</Label>
                      <Select>
                        <SelectTrigger className="border-tedora-teal/30">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="child-school">School (if applicable)</Label>
                      <Input id="child-school" placeholder="School name" className="border-tedora-teal/30" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Textarea 
                        id="allergies" 
                        placeholder="List any allergies or 'None'"
                        className="min-h-[100px] border-tedora-teal/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medical">Medical Conditions</Label>
                      <Textarea 
                        id="medical" 
                        placeholder="List any medical conditions or 'None'"
                        className="min-h-[100px] border-tedora-teal/30"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="child-notes">Special Notes</Label>
                    <Textarea 
                      id="child-notes" 
                      placeholder="Activities they enjoy, comfort items, routines, etc."
                      className="min-h-[100px] border-tedora-teal/30"
                    />
                  </div>
                  
                  <Button onClick={handleAddChild} className="bg-tedora-teal hover:bg-tedora-tealLight w-full sm:w-auto">
                    Add Child
                  </Button>
                </CardContent>
              </Card>
              
              <div className="text-center py-8 border-2 border-dashed rounded-lg border-tedora-teal/20">
                <Search className="h-8 w-8 text-tedora-teal/50 mx-auto mb-2" />
                <p className="text-gray-500">No child profiles found</p>
                <p className="text-sm text-gray-400 mb-4">Add a child profile using the form above</p>
              </div>
            </TabsContent>
            
            <TabsContent value="elderly" className="space-y-6">
              <Card className="mb-6 border-tedora-teal/20 shadow-md">
                <CardHeader>
                  <CardTitle>Add Elderly Care Profile</CardTitle>
                  <CardDescription>
                    Add information about elderly family members who will receive care.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="elderly-name">Full Name</Label>
                      <Input id="elderly-name" placeholder="Full name" className="border-tedora-teal/30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="elderly-dob">Date of Birth</Label>
                      <Input id="elderly-dob" type="date" className="border-tedora-teal/30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="elderly-gender">Gender</Label>
                      <Select>
                        <SelectTrigger className="border-tedora-teal/30">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobility">Mobility Status</Label>
                      <Select>
                        <SelectTrigger className="border-tedora-teal/30">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="independent">Fully Independent</SelectItem>
                          <SelectItem value="assistant">Needs Some Assistance</SelectItem>
                          <SelectItem value="dependent">Depends on Assistance</SelectItem>
                          <SelectItem value="wheelchair">Wheelchair User</SelectItem>
                          <SelectItem value="bedbound">Mostly Bedbound</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="elderly-medical">Medical Conditions</Label>
                      <Textarea 
                        id="elderly-medical" 
                        placeholder="List relevant medical conditions"
                        className="min-h-[100px] border-tedora-teal/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medications">Current Medications</Label>
                      <Textarea 
                        id="medications" 
                        placeholder="List medications and schedule"
                        className="min-h-[100px] border-tedora-teal/30"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="elderly-preferences">Care Preferences</Label>
                    <Textarea 
                      id="elderly-preferences" 
                      placeholder="Daily routines, preferences, dislikes, etc."
                      className="min-h-[100px] border-tedora-teal/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emergency-contact">Emergency Contact</Label>
                    <Input 
                      id="emergency-contact"
                      placeholder="Name, relationship and contact number"
                      className="border-tedora-teal/30"
                    />
                  </div>
                  
                  <Button onClick={handleAddElderly} className="bg-tedora-teal hover:bg-tedora-tealLight w-full sm:w-auto">
                    Add Profile
                  </Button>
                </CardContent>
              </Card>
              
              <div className="text-center py-8 border-2 border-dashed rounded-lg border-tedora-teal/20">
                <Search className="h-8 w-8 text-tedora-teal/50 mx-auto mb-2" />
                <p className="text-gray-500">No elderly care profiles found</p>
                <p className="text-sm text-gray-400 mb-4">Add an elderly care profile using the form above</p>
              </div>
            </TabsContent>
            
            <TabsContent value="preferences" className="space-y-6">
              <Card className="border-tedora-teal/20 shadow-md">
                <CardHeader>
                  <CardTitle>Care Preferences</CardTitle>
                  <CardDescription>
                    Set your general preferences for all caregiving services.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Communication Language</Label>
                    <Select defaultValue="english">
                      <SelectTrigger className="border-tedora-teal/30">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="bengali">Bengali</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="urdu">Urdu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dietary">Dietary Restrictions</Label>
                    <Textarea 
                      id="dietary" 
                      placeholder="Any dietary restrictions or preferences for your family"
                      className="min-h-[100px] border-tedora-teal/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cultural">Cultural Considerations</Label>
                    <Textarea 
                      id="cultural" 
                      placeholder="Any cultural practices or considerations caregivers should be aware of"
                      className="min-h-[100px] border-tedora-teal/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="caregiver-preferences">Caregiver Preferences</Label>
                    <Textarea 
                      id="caregiver-preferences" 
                      placeholder="Any specific requirements or preferences regarding caregivers"
                      className="min-h-[100px] border-tedora-teal/30"
                    />
                  </div>
                  
                  <Button className="bg-tedora-teal hover:bg-tedora-tealLight w-full sm:w-auto">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="packages" className="space-y-6">
              <Card className="border-tedora-teal/20 shadow-md mb-8">
                <CardHeader>
                  <CardTitle>Monthly Care Packages</CardTitle>
                  <CardDescription>
                    View and select from our comprehensive care plans tailored to your family's needs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="child_care">
                    <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100">
                      <TabsTrigger 
                        value="child_care" 
                        className="data-[state=active]:bg-tedora-teal data-[state=active]:text-white"
                      >
                        Child Care Packages
                      </TabsTrigger>
                      <TabsTrigger 
                        value="elderly_care"
                        className="data-[state=active]:bg-tedora-teal data-[state=active]:text-white"
                      >
                        Elderly Care Packages
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="child_care">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {childPackages.map((pkg) => (
                            <PackageCard key={pkg.id} pkg={pkg} />
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="elderly_care">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {elderlyPackages.map((pkg) => (
                            <PackageCard key={pkg.id} pkg={pkg} />
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card className="border-tedora-teal/20 shadow-md">
                <CardHeader>
                  <CardTitle>Current Package</CardTitle>
                  <CardDescription>
                    You don't currently have an active care package.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-500 my-4">Select a package above to subscribe</p>
                  <Button className="bg-tedora-teal hover:bg-tedora-tealLight w-full">
                    Talk to Care Advisor
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

interface PackageCardProps {
  pkg: any;
}

const PackageCard = ({ pkg }: PackageCardProps) => {
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
  
  // Define styling based on tier
  const getCardStyle = (tier: string) => {
    switch(tier) {
      case 'premium':
        return {
          border: 'border-tedora-gold border-2',
          badge: 'bg-tedora-gold text-white',
          button: 'bg-tedora-gold hover:bg-tedora-gold/90 text-white',
        };
      case 'standard':
        return {
          border: 'border-tedora-teal',
          badge: 'bg-tedora-tealLight text-white',
          button: 'bg-tedora-teal hover:bg-tedora-teal/90 text-white',
        };
      default: // basic
        return {
          border: 'border-gray-200',
          badge: 'bg-gray-200 text-gray-700',
          button: 'bg-gray-700 hover:bg-gray-800 text-white',
        };
    }
  };
  
  const style = getCardStyle(pkg.tier);
  
  return (
    <div className={`rounded-lg overflow-hidden shadow-md ${style.border}`}>
      <div className="p-4 bg-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg capitalize">{pkg.tier} Package</h3>
            <p className="text-sm text-gray-500">
              {pkg.care_type === 'child' ? 'Child Care' : 'Elderly Care'}
            </p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${style.badge}`}>
            {pkg.tier}
          </span>
        </div>
        
        <p className="text-2xl font-bold mb-4">
          {formatPrice(pkg.price)} <span className="text-sm font-normal">/month</span>
        </p>
        
        <ul className="space-y-2 text-sm mb-4">
          <li className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-tedora-teal mt-0.5" />
            <span>
              {pkg.is_24_hour 
                ? <span>24-hour service</span>
                : <span>Service: {formatTime(pkg.hours_start)} - {formatTime(pkg.hours_end)}</span>
              }
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-tedora-teal mt-0.5" />
            <span>{pkg.weekend_days} Weekend {pkg.weekend_days > 1 ? 'Days' : 'Day'}</span>
          </li>
          <li>
            {pkg.includes_medication ? (
              <span className="inline-flex items-center text-green-600">
                <Check className="h-4 w-4 mr-1" /> Medication Management
              </span>
            ) : (
              <span className="inline-flex items-center text-gray-400">
                <X className="h-4 w-4 mr-1" /> No Medication Management
              </span>
            )}
          </li>
          <li>
            {pkg.includes_exercise ? (
              <span className="inline-flex items-center text-green-600">
                <Check className="h-4 w-4 mr-1" /> Exercise & Activities
              </span>
            ) : (
              <span className="inline-flex items-center text-gray-400">
                <X className="h-4 w-4 mr-1" /> No Exercise Program
              </span>
            )}
          </li>
        </ul>
        
        <Button className={`w-full mt-2 ${style.button}`}>
          Select Package
        </Button>
      </div>
    </div>
  );
};

export default FamilyProfile;
