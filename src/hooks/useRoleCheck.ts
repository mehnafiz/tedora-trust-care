
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface RoleCheckResult {
  isClient: boolean;
  isEmployee: boolean;
  isLoading: boolean;
  user: any | null;
}

export const useRoleCheck = (): RoleCheckResult => {
  const [isClient, setIsClient] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsLoading(false);
          return;
        }

        setUser(session.user);
        const userData = session.user.user_metadata;
        
        // Check if user is a client based on metadata
        if (userData && userData.role === "client") {
          setIsClient(true);
        } else {
          // Check if user is an employee
          const { data: employee } = await supabase
            .from('employees')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
          
          setIsEmployee(!!employee);
        }
      } catch (error) {
        console.error("Error checking user role:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserRole();
  }, []);

  return { isClient, isEmployee, isLoading, user };
};
