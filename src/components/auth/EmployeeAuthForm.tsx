
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EmployeeAuthFormProps {
  onSuccess: () => void;
}

const EmployeeAuthForm = ({ onSuccess }: EmployeeAuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError("Please provide both email and password");
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
        .maybeSingle();
      
      if (employeeError || !employeeData) {
        // If not an employee or not validated, sign them out
        await supabase.auth.signOut();
        
        throw new Error("Your account is not authorized as an employee or has not been validated");
      }
      
      // Update user metadata to indicate this is an employee
      await supabase.auth.updateUser({
        data: { role: 'employee' }
      });
      
      toast({
        title: "Welcome back",
        description: "You are now logged in as an employee of TEDora+ Trust Everyday Care",
      });
      
      onSuccess();
    } catch (error: any) {
      setError(error.message || "Please check your credentials");
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
    <div>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@tedora-plus.com"
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
        
        <p className="text-center text-sm text-gray-600 mt-4">
          Staff portal access is restricted to authorized personnel only
        </p>
      </form>
    </div>
  );
};

export default EmployeeAuthForm;
