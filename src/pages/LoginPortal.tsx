
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const LoginPortal = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    
    checkUser();
  }, [navigate]);

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

  const validateForm = () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    // Validate phone number format
    const phoneRegex = /^\+8801[3-9]\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid Bangladeshi phone number (+8801XXXXXXXXX)",
        variant: "destructive",
      });
      return false;
    }

    // Validate password length
    if (formData.password.length < 6) {
      toast({
        title: "Weak password",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      if (isSignup) {
        // Check if user already exists
        const { data: existingUsers, error: checkError } = await supabase
          .from('profiles')
          .select('id')
          .eq('phone', formData.phone);
          
        if (checkError) throw checkError;
        
        if (existingUsers && existingUsers.length > 0) {
          toast({
            title: "Account already exists",
            description: "An account with this phone number already exists. Please login instead.",
            variant: "destructive",
          });
          setIsSignup(false);
          setIsLoading(false);
          return;
        }
        
        // Sign up new user
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              phone: formData.phone,
              address: formData.address,
            },
          },
        });

        if (signUpError) throw signUpError;

        toast({
          title: "Account created successfully!",
          description: "You have been automatically logged in.",
        });
        
        navigate('/dashboard');
      } else {
        // Sign in existing user
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) throw signInError;

        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        });

        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email"
                  placeholder="your@email.com" 
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
                  minLength={6}
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-[#6BA8A9] hover:bg-[#6BA8A9]/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : (isSignup ? "Create Account" : "Login")}
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
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">Need help? Call us at <a href="tel:+8801772322383" className="font-semibold text-[#6BA8A9]">+8801772322383</a></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPortal;
