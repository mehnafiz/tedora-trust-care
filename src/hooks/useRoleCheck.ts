
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RoleCheckResult {
  isClient: boolean;
  isEmployee: boolean;
  isLoading: boolean;
  user: any | null;
  refreshUser: () => Promise<void>;
}

export const useRoleCheck = (): RoleCheckResult => {
  const [isClient, setIsClient] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  const checkUserRole = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setIsClient(false);
        setIsEmployee(false);
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Store full user object for access to metadata
      setUser(session.user);
      const userData = session.user.user_metadata;
      
      // Check if user is a client based on metadata
      if (userData && userData.role === "client") {
        setIsClient(true);
        setIsEmployee(false);
      } else {
        // Check if user is an employee with verification
        const { data: employee, error } = await supabase
          .from('employees')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('is_validated', true) // Important: Only consider validated employees
          .maybeSingle();
        
        if (error) {
          console.error("Error checking employee status:", error);
          toast({
            title: "Authentication Error",
            description: "There was a problem verifying your account status.",
            variant: "destructive",
          });
        }
        
        if (employee) {
          setIsEmployee(true);
          setIsClient(false);
          
          // If user is an employee but doesn't have the role set, update it
          if (!userData?.role || userData.role !== "employee") {
            await supabase.auth.updateUser({
              data: { role: 'employee' }
            });
          }
        } else {
          setIsEmployee(false);
          setIsClient(true);
          
          // If user has no role, default to client
          if (!userData?.role) {
            await supabase.auth.updateUser({
              data: { role: 'client' }
            });
          }
        }
      }
    } catch (error) {
      console.error("Error checking user role:", error);
      toast({
        title: "Authentication Error",
        description: "There was a problem verifying your account. Please try logging in again.",
        variant: "destructive",
      });
      setIsClient(false);
      setIsEmployee(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // First set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUser(session.user);
          // Use setTimeout to avoid potential auth deadlocks
          setTimeout(() => {
            checkUserRole();
          }, 0);
        } else {
          setUser(null);
          setIsClient(false);
          setIsEmployee(false);
          setIsLoading(false);
        }
      }
    );
    
    // Then check initial session
    checkUserRole();
    
    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const refreshUser = async () => {
    setIsLoading(true);
    await checkUserRole();
  };

  return { isClient, isEmployee, isLoading, user, refreshUser };
};
