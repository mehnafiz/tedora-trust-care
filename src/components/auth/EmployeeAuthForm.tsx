
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EmployeeAuthFormProps {
  onSuccess: () => void;
}

const EmployeeAuthForm = ({ onSuccess }: EmployeeAuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please provide both email and password",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // First, try to sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInError) {
        throw signInError;
      }
      
      if (!signInData.user) {
        throw new Error("Authentication failed");
      }
      
      // Check if this user is an employee
      const { data: employeeData, error: employeeError } = await supabase
        .from('employees')
        .select('*')
        .eq('user_id', signInData.user.id)
        .eq('is_validated', true)
        .single();
      
      if (employeeError || !employeeData) {
        // If not an employee or not validated, sign them out
        await supabase.auth.signOut();
        
        toast({
          title: "Access Denied",
          description: "Your account is not authorized as an employee or has not been validated",
          variant: "destructive",
        });
        
        setLoading(false);
        return;
      }
      
      // The update is removed since the last_login field doesn't exist in the employees table
      // We could add a timestamp update here if we added that field to the table
      
      toast({
        title: "Welcome back",
        description: "You are now logged in as an employee",
      });
      
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Authentication failed",
        description: error.message || "Please check your credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email"
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@company.com"
          className="bg-white/80 backdrop-blur-sm border-gray-300"
          disabled={loading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password"
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="bg-white/80 backdrop-blur-sm border-gray-300"
          disabled={loading}
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-[#6BA8A9] hover:bg-[#6BA8A9]/90 text-white"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
};

export default EmployeeAuthForm;
