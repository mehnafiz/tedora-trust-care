
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useEmployeeValidation = () => {
  const [isValidEmployee, setIsValidEmployee] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkEmployeeStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsValidEmployee(false);
          setIsLoading(false);
          return;
        }

        const { data: employee } = await supabase
          .from('employees')
          .select('is_validated')
          .eq('user_id', session.user.id)
          .single();

        setIsValidEmployee(employee?.is_validated || false);
      } catch (error) {
        console.error('Error checking employee status:', error);
        setIsValidEmployee(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkEmployeeStatus();
  }, []);

  return { isValidEmployee, isLoading };
};
