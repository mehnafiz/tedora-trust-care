
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

type UrgencyTimerProps = {
  caregiverCount?: number;
  deadlineHour?: number;
  deadlineMinute?: number;
}

const UrgencyTimer = ({ 
  caregiverCount = 3, 
  deadlineHour = 20, 
  deadlineMinute = 0 
}: UrgencyTimerProps) => {
  const currentHour = new Date().getHours();
  const initialHours = currentHour >= deadlineHour ? 24 - currentHour + deadlineHour : deadlineHour - currentHour;
  
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

  // Format time to 12-hour format with AM/PM
  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };
  
  return (
    <div className="w-full bg-tedora-peach text-gray-800 py-2 px-4 flex justify-center items-center text-sm md:text-base font-medium">
      <div className="flex items-center gap-2">
        <Clock size={16} className="animate-pulse" />
        <span>
          <strong id="caregiverCount">{caregiverCount} Caregivers Available Today</strong> – Book Before <span id="deadlineTime">{formatTime(deadlineHour, deadlineMinute)}</span>!
        </span>
      </div>
    </div>
  );
};

export default UrgencyTimer;
