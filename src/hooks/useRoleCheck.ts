
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

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

      setUser(session.user);
      const userData = session.user.user_metadata;
      
      // Check if user is a client based on metadata
      if (userData && userData.role === "client") {
        setIsClient(true);
        setIsEmployee(false);
      } else {
        // Check if user is an employee
        const { data: employee } = await supabase
          .from('employees')
          .select('*')
          .eq('user_id', session.user.id)
          .maybeSingle();
        
        if (employee) {
          setIsEmployee(true);
          setIsClient(false);
        } else {
          setIsEmployee(false);
          setIsClient(false);
        }
      }
    } catch (error) {
      console.error("Error checking user role:", error);
      setIsClient(false);
      setIsEmployee(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUserRole();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUser(session.user);
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
