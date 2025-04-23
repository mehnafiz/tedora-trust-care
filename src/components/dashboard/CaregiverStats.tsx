
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CaregiverStatsProps {
  stats: {
    total: number;
    available: number;
    booked: number;
  };
}

export const CaregiverStats = ({ stats }: CaregiverStatsProps) => {
  return (
    <Card className="mb-6 bg-white/90 backdrop-blur-sm border border-[#6BA8A9]/20">
      <CardHeader>
        <CardTitle className="text-2xl font-montserrat">Welcome!</CardTitle>
        <CardDescription>
          Current Caregiver Availability Status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center p-4 bg-[#6BA8A9]/10 rounded-lg">
            <p className="text-2xl font-bold text-[#6BA8A9]">{stats.total}</p>
            <p className="text-sm text-gray-600">Total Caregivers</p>
          </div>
          <div className="text-center p-4 bg-green-100 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{stats.available}</p>
            <p className="text-sm text-gray-600">Available Now</p>
          </div>
          <div className="text-center p-4 bg-orange-100 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">{stats.booked}</p>
            <p className="text-sm text-gray-600">Currently Booked</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
