
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Doctor3D } from "@/components/Doctor3D";
import { motion } from "framer-motion";

const LoginPortal = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressChange = (value: string) => {
    setFormData({
      ...formData,
      address: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number format
    const phoneRegex = /^\+8801[3-9]\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid Bangladeshi phone number (+8801XXXXXXXXX)",
        variant: "destructive",
      });
      return;
    }

    // Simple mock authentication
    if (selectedRole === "client") {
      // For client, simulate OTP sent
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your WhatsApp/SMS",
      });
      
      // Mock successful authentication after 2 seconds
      setTimeout(() => {
        localStorage.setItem("tedora_user", JSON.stringify({
          role: "client",
          name: formData.name,
          phone: formData.phone,
        }));
        navigate("/dashboard");
      }, 2000);
    } else {
      // For caregivers, check if admin-approved
      if (formData.email === "employee@tedora.com" && formData.password === "tedora2024") {
        localStorage.setItem("tedora_user", JSON.stringify({
          role: "caregiver",
          name: "Team Member",
          phone: formData.phone,
        }));
        navigate("/dashboard");
      } else {
        toast({
          title: "Access Denied",
          description: "Please contact admin for approved credentials",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6BA8A9]/10 to-[#FF9E7D]/10">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        {/* Logo and Tagline */}
        <div className="mb-16 text-center">
          <img 
            src="/lovable-uploads/392329e6-0859-48e9-9da2-7918163f0ee5.png" 
            alt="TEDora+ Logo" 
            className="h-32 w-auto mx-auto drop-shadow-lg"
          />
          <h1 className="text-3xl font-montserrat font-bold mt-4 text-gray-800">TEDora+</h1>
          <p className="text-[#6BA8A9] italic">"Trust Everyday Care"</p>
        </div>

        {!selectedRole ? (
          // Role Selection
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-montserrat font-bold text-center mb-8">Welcome! Choose your role</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-[#6BA8A9]/20 flex flex-col items-center transition-all hover:shadow-xl"
                onClick={() => handleRoleSelect("client")}
              >
                <img src="https://img.icons8.com/bubbles/100/000000/user.png" alt="Client" className="h-24 w-24 mb-4" />
                <span className="text-lg font-montserrat font-semibold">I'm a Client/Family</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-[#FF9E7D]/20 flex flex-col items-center transition-all hover:shadow-xl"
                onClick={() => handleRoleSelect("caregiver")}
              >
                <img src="https://img.icons8.com/bubbles/100/000000/nurse-female.png" alt="Caregiver" className="h-24 w-24 mb-4" />
                <span className="text-lg font-montserrat font-semibold">I'm a Caregiver/Employee</span>
              </motion.button>
            </div>
          </div>
        ) : (
          // Authentication Form
          <div className="w-full max-w-lg bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-[#6BA8A9]/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-montserrat font-bold">
                {selectedRole === "client" 
                  ? (isSignup ? "Create Family Account" : "Access Your Account") 
                  : "Caregiver Login"}
              </h2>
              <button 
                onClick={() => setSelectedRole(null)}
                className="text-xs text-gray-500 hover:text-[#FF9E7D]"
              >
                ← Change role
              </button>
            </div>

            {/* 3D Animation for Client Flow */}
            {selectedRole === "client" && (
              <div className="absolute right-10 top-40 hidden lg:block">
                <Doctor3D />
                <div className="mt-2 bg-white/80 backdrop-blur-md p-2 rounded-lg shadow-md text-center text-sm">
                  <p>Hi! I'm Dr. Tania, your care advisor.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {selectedRole === "client" && (
                <>
                  {isSignup && (
                    <>
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="Your name" 
                          value={formData.name}
                          onChange={handleInputChange}
                          required={isSignup}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="address">Area</Label>
                        <Select onValueChange={handleAddressChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your area" />
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
                    </>
                  )}

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      placeholder="+8801772322383" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: +8801XXXXXXXXX</p>
                  </div>
                </>
              )}

              {selectedRole === "caregiver" && (
                <>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email"
                      placeholder="employee@tedora.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      name="password" 
                      type="password"
                      placeholder="••••••••" 
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-[#6BA8A9] hover:bg-[#6BA8A9]/90 text-white"
                >
                  {selectedRole === "client" 
                    ? (isSignup ? "Create Account" : "Send OTP") 
                    : "Login"
                  }
                </Button>
              </div>
            </form>

            {selectedRole === "client" && (
              <div className="mt-4 text-center">
                <button 
                  onClick={() => setIsSignup(!isSignup)} 
                  className="text-sm text-[#FF9E7D] hover:underline"
                >
                  {isSignup ? "Already have an account? Login" : "New user? Create account"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPortal;
