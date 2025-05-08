
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
import { Users, Baby, UserRoundCog, HeartPulse, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FamilyProfile = () => {
  const [activeTab, setActiveTab] = useState("family");

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

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="family" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Family Details</span>
              </TabsTrigger>
              <TabsTrigger value="children" className="flex items-center gap-2">
                <Baby className="h-4 w-4" />
                <span>Children</span>
              </TabsTrigger>
              <TabsTrigger value="elderly" className="flex items-center gap-2">
                <HeartPulse className="h-4 w-4" />
                <span>Elderly Care</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <UserRoundCog className="h-4 w-4" />
                <span>Preferences</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="family" className="space-y-6">
              <Card>
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
                        <SelectTrigger>
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
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="special-instructions">Special Instructions for Caregivers</Label>
                    <Textarea 
                      id="special-instructions" 
                      placeholder="Any special information or instructions caregivers should know about your home"
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <Button onClick={handleSaveGeneral} className="bg-tedora-sage hover:bg-tedora-sage/90 w-full sm:w-auto">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="children" className="space-y-6">
              <Card className="mb-6">
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
                      <Input id="child-name" placeholder="Child's full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="child-dob">Date of Birth</Label>
                      <Input id="child-dob" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="child-gender">Gender</Label>
                      <Select>
                        <SelectTrigger>
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
                      <Input id="child-school" placeholder="School name" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Textarea 
                        id="allergies" 
                        placeholder="List any allergies or 'None'"
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medical">Medical Conditions</Label>
                      <Textarea 
                        id="medical" 
                        placeholder="List any medical conditions or 'None'"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="child-notes">Special Notes</Label>
                    <Textarea 
                      id="child-notes" 
                      placeholder="Activities they enjoy, comfort items, routines, etc."
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <Button onClick={handleAddChild} className="bg-tedora-sage hover:bg-tedora-sage/90 w-full sm:w-auto">
                    Add Child
                  </Button>
                </CardContent>
              </Card>
              
              <div className="text-center py-8 border-2 border-dashed rounded-lg border-gray-200">
                <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No child profiles found</p>
                <p className="text-sm text-gray-400 mb-4">Add a child profile using the form above</p>
              </div>
            </TabsContent>
            
            <TabsContent value="elderly" className="space-y-6">
              <Card className="mb-6">
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
                      <Input id="elderly-name" placeholder="Full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="elderly-dob">Date of Birth</Label>
                      <Input id="elderly-dob" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="elderly-gender">Gender</Label>
                      <Select>
                        <SelectTrigger>
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
                        <SelectTrigger>
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
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medications">Current Medications</Label>
                      <Textarea 
                        id="medications" 
                        placeholder="List medications and schedule"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="elderly-preferences">Care Preferences</Label>
                    <Textarea 
                      id="elderly-preferences" 
                      placeholder="Daily routines, preferences, dislikes, etc."
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emergency-contact">Emergency Contact</Label>
                    <Input 
                      id="emergency-contact"
                      placeholder="Name, relationship and contact number"
                    />
                  </div>
                  
                  <Button onClick={handleAddElderly} className="bg-tedora-sage hover:bg-tedora-sage/90 w-full sm:w-auto">
                    Add Profile
                  </Button>
                </CardContent>
              </Card>
              
              <div className="text-center py-8 border-2 border-dashed rounded-lg border-gray-200">
                <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No elderly care profiles found</p>
                <p className="text-sm text-gray-400 mb-4">Add an elderly care profile using the form above</p>
              </div>
            </TabsContent>
            
            <TabsContent value="preferences" className="space-y-6">
              <Card>
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
                      <SelectTrigger>
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
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cultural">Cultural Considerations</Label>
                    <Textarea 
                      id="cultural" 
                      placeholder="Any cultural practices or considerations caregivers should be aware of"
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="caregiver-preferences">Caregiver Preferences</Label>
                    <Textarea 
                      id="caregiver-preferences" 
                      placeholder="Any specific requirements or preferences regarding caregivers"
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <Button className="bg-tedora-sage hover:bg-tedora-sage/90 w-full sm:w-auto">
                    Save Preferences
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

export default FamilyProfile;
