
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
}

export const ServiceRequestsTable = ({ serviceRequests }: ServiceRequestsTableProps) => {
  if (serviceRequests.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No service requests found</p>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-[#6BA8A9]/20">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service Type</TableHead>
            <TableHead>Care Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {serviceRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.service_type}</TableCell>
              <TableCell className="capitalize">{request.care_type}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  request.status === 'approved' ? 'bg-green-100 text-green-800' :
                  request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  request.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {request.status}
                </span>
              </TableCell>
              <TableCell>{new Date(request.start_time).toLocaleString()}</TableCell>
              <TableCell>{request.duration_hours} hours</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
