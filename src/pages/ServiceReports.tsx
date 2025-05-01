
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const ServiceReports = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitDummyReport = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report Submitted",
        description: "Your service report has been submitted successfully",
      });
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-xl font-montserrat font-bold">Submit Service Report</h2>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Client Name</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">Select a client</option>
                  <option value="client1">Rahman Family</option>
                  <option value="client2">Hossain Family</option>
                  <option value="client3">Ahmed Elderly Care</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Service Date</label>
                <input type="date" className="w-full p-2 border rounded-md" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Service Duration (hours)</label>
                <input type="number" min="1" className="w-full p-2 border rounded-md" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Service Type</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">Select service type</option>
                  <option value="childcare">Childcare</option>
                  <option value="elderly">Elderly Care</option>
                  <option value="overnight">Overnight Care</option>
                  <option value="special">Special Needs Care</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Activities Performed</label>
                <textarea 
                  className="w-full p-2 border rounded-md min-h-[100px]"
                  placeholder="Describe activities performed during the service..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Notes & Observations</label>
                <textarea 
                  className="w-full p-2 border rounded-md min-h-[100px]"
                  placeholder="Any important notes or observations..."
                ></textarea>
              </div>
              
              <Button 
                className="w-full bg-tedora-sage hover:bg-tedora-sage/90"
                onClick={handleSubmitDummyReport}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Report"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <h2 className="text-xl font-montserrat font-bold mt-8">Previous Reports</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500 py-8">No previous reports found</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ServiceReports;
