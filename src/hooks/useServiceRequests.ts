
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useRoleCheck } from "./useRoleCheck";

interface ServiceRequest {
  id: string;
  service_type: string;
  care_type: string;
  status: string;
  start_time: string;
  duration_hours: number;
  caregivers?: {
    name: string;
    specialization: string;
  };
}

export const useServiceRequests = () => {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useRoleCheck();

  // Fetch service requests
  const fetchServiceRequests = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .select(`
          *,
          caregivers (
            name,
            specialization
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setServiceRequests(data || []);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error fetching services",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Mark a service as complete
  const completeService = async (id: string) => {
    try {
      const { error } = await supabase
        .from('service_requests')
        .update({ status: 'completed' })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state to reflect the change
      setServiceRequests(prev => 
        prev.map(request => 
          request.id === id ? { ...request, status: 'completed' } : request
        )
      );
      
      toast({
        title: "Success",
        description: "Service marked as completed"
      });
      
      return true;
    } catch (err: any) {
      toast({
        title: "Error completing service",
        description: err.message,
        variant: "destructive"
      });
      return false;
    }
  };

  // Run on component mount and when user changes
  useEffect(() => {
    if (user) {
      fetchServiceRequests();
    }
  }, [user]);

  return {
    serviceRequests,
    loading,
    error,
    refreshServiceRequests: fetchServiceRequests,
    completeService
  };
};
