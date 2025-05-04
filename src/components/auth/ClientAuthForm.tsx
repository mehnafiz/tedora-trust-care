
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ClientAuthFormProps {
  isSignup: boolean;
  setIsSignup: (value: boolean) => void;
  onSuccess: () => void;
  toast: any;
}

interface FormData {
  name: string;
  phone: string;
  address: string;
  email: string;
  password: string;
}

const ClientAuthForm = ({ isSignup, setIsSignup, onSuccess, toast }: ClientAuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage(null);
  };

  const handleAddressChange = (value: string) => {
    setFormData({
      ...formData,
      address: value,
    });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    if (isSignup) {
      const phoneRegex = /^\+8801[3-9]\d{8}$/;
      if (!phoneRegex.test(formData.phone)) {
        toast({
          title: "Invalid phone number",
          description: "Please enter a valid Bangladeshi phone number (+8801XXXXXXXXX)",
          variant: "destructive",
        });
        return false;
      }
    }

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
    setErrorMessage(null);
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      if (isSignup) {
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
        
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              phone: formData.phone,
              address: formData.address,
              role: "client",
            },
          },
        });

        if (signUpError) throw signUpError;

        toast({
          title: "Account created successfully!",
          description: "You have been automatically logged in.",
        });
        
        onSuccess();
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) throw signInError;
        
        // Check if user is a client
        const userData = data.user?.user_metadata;
        if (userData && userData.role !== "client") {
          await supabase.auth.signOut();
          throw new Error("This account is not registered as a client. Please use the appropriate login option.");
        }

        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        });

        onSuccess();
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      setErrorMessage(error.message);
      toast({
        title: "Authentication Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

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
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
          ) : (
            isSignup ? "Create Account" : "Login"
          )}
        </Button>
      </div>

      <div className="mt-4 text-center">
        <button 
          type="button"
          onClick={() => setIsSignup(!isSignup)} 
          className="text-sm text-[#FF9E7D] hover:underline"
        >
          {isSignup ? "Already have an account? Login" : "New user? Create account"}
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Need help? Call us at <a href="tel:+8801772322383" className="font-semibold text-[#6BA8A9]">+8801772322383</a>
        </p>
      </div>
    </form>
  );
};

export default ClientAuthForm;
