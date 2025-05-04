
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

interface ServiceRequestsTableProps {
  serviceRequests: ServiceRequest[];
  onServiceComplete?: (id: string) => void;
  refreshData?: () => void;
}

export const ServiceRequestsTable = ({ 
  serviceRequests, 
  onServiceComplete,
  refreshData
}: ServiceRequestsTableProps) => {
  const [completingIds, setCompletingIds] = useState<string[]>([]);
  const { toast } = useToast();

  const handleMarkComplete = async (id: string) => {
    if (!id) return;
    
    setCompletingIds(prev => [...prev, id]);
    try {
      const { error } = await supabase
        .from('service_requests')
        .update({ status: 'completed' })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Service marked as complete",
        description: "The service has been successfully marked as completed",
      });
      
      // Call the parent component's handler if provided
      if (onServiceComplete) {
        onServiceComplete(id);
      }
      
      // Refresh data if refresh function provided
      if (refreshData) {
        refreshData();
      }
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Could not complete the service request",
        variant: "destructive"
      });
    } finally {
      setCompletingIds(prev => prev.filter(itemId => itemId !== id));
    }
  };

  if (serviceRequests.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No service requests found</p>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-[#6BA8A9]/20">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service Type</TableHead>
              <TableHead>Care Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serviceRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.service_type}</TableCell>
                <TableCell className="capitalize">{request.care_type}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    request.status === 'approved' || request.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                </TableCell>
                <TableCell>{new Date(request.start_time).toLocaleString()}</TableCell>
                <TableCell>{request.duration_hours} hours</TableCell>
                <TableCell className="text-right">
                  {request.status !== 'completed' && (
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => handleMarkComplete(request.id)}
                      disabled={completingIds.includes(request.id)}
                      className="border-tedora-sage text-tedora-sage hover:bg-tedora-sage/10"
                    >
                      <Check className="h-3 w-3 mr-1" /> 
                      {completingIds.includes(request.id) ? 'Processing...' : 'Complete'}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
