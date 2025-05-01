
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EmployeeAuthFormProps {
  onSuccess: () => void;
  toast: any;
}

const EmployeeAuthForm = ({ onSuccess, toast }: EmployeeAuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    // Check if too many failed attempts (simple rate limiting)
    if (loginAttempts >= 5) {
      setErrorMessage("Too many failed login attempts. Please try again later.");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) {
        setLoginAttempts(prev => prev + 1);
        throw signInError;
      }
      
      // Verify this is an employee account by checking the employees table
      const { data: employeeData, error: employeeError } = await supabase
        .from('employees')
        .select('*, is_validated')
        .eq('email', formData.email)
        .eq('user_id', data.user?.id)
        .single();
      
      if (employeeError || !employeeData) {
        // If not an employee, sign out and show error
        await supabase.auth.signOut();
        setLoginAttempts(prev => prev + 1);
        throw new Error("Unauthorized access. This login is for authorized employees only.");
      }

      // Check if employee is validated
      if (!employeeData.is_validated) {
        await supabase.auth.signOut();
        throw new Error("Your account has not been validated yet. Please contact an administrator.");
      }

      // Reset login attempts on successful login
      setLoginAttempts(0);

      toast({
        title: "Employee authenticated",
        description: "Welcome to the employee portal.",
      });

      // Update employee's last login time in the database
      const now = new Date().toISOString();
      await supabase
        .from('employees')
        .update({ last_login: now })
        .eq('user_id', data.user?.id);

      onSuccess();
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
          className="w-full bg-[#FF9E7D] hover:bg-[#FF9E7D]/90 text-white"
          disabled={isLoading || loginAttempts >= 5}
        >
          {isLoading ? "Processing..." : "Employee Login"}
        </Button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Employee accounts are created by administrators only.
        </p>
      </div>
        
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Need help? Call us at <a href="tel:+8801772322383" className="font-semibold text-[#6BA8A9]">+8801772322383</a>
        </p>
      </div>
    </form>
  );
};

export default EmployeeAuthForm;
