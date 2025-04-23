
import { Clock, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

const UrgencyTimer = () => {
  const currentHour = new Date().getHours();
  const initialHours = currentHour >= 20 ? 24 - currentHour + 8 : 20 - currentHour;
  
  const [hours, setHours] = useState<number>(initialHours);
  const [minutes, setMinutes] = useState<number>(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      if (minutes === 0) {
        if (hours === 0) {
          clearInterval(timer);
        } else {
          setHours(h => h - 1);
          setMinutes(59);
        }
      } else {
        setMinutes(m => m - 1);
      }
    }, 60000); // update every minute
    
    return () => clearInterval(timer);
  }, [hours, minutes]);
  
  return (
    <div className="w-full bg-[#FF9E7D] text-gray-800 py-2 px-4 flex justify-center items-center text-sm md:text-base font-medium">
      <div className="flex items-center gap-2">
        <Clock size={16} className="animate-pulse" />
        <span>
          <strong>3 Caregivers Available Today</strong> – Book Before {hours}:
          {minutes.toString().padStart(2, '0')} PM!
        </span>
      </div>
    </div>
  );
};

export default UrgencyTimer;
