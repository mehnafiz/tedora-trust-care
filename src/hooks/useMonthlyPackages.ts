
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface MonthlyPackage {
  id: string;
  name: string;
  care_type: string;
  tier: string;
  price: number;
  hours_start: string;
  hours_end: string;
  is_24_hour: boolean;
  weekend_days: number;
  includes_medication: boolean;
  includes_exercise: boolean;
}

export const useMonthlyPackages = () => {
  const [packages, setPackages] = useState<MonthlyPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('monthly_packages')
          .select('*')
          .order('price');
          
        if (error) throw error;
        setPackages(data || []);
      } catch (err: any) {
        console.error('Error fetching monthly packages:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPackages();
  }, []);
  
  return { packages, loading, error };
};
