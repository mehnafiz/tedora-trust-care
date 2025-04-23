
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Doctor3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Simulate 3D effect with CSS animations rather than actual 3D
  // In a real app, you might use Three.js or another 3D library
  return (
    <motion.div 
      ref={containerRef}
      className="relative w-[200px] h-[280px]"
      animate={{ 
        y: [0, -10, 0], 
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 3,
        ease: "easeInOut" 
      }}
    >
      {/* Doctor Image */}
      <div className="relative z-10">
        <img 
          src="https://img.icons8.com/color/240/null/female-doctor.png" 
          alt="Dr. Tania"
          className="w-[200px] h-auto drop-shadow-lg"
        />
        
        {/* iPad/Sign showing price */}
        <div className="absolute bottom-14 -right-4 bg-white rounded-xl shadow-lg p-2 border-2 border-[#6BA8A9] rotate-12 transform transition-all hover:rotate-0">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Elderly Care</span>
            <span className="text-lg font-bold text-[#6BA8A9]">৳1,799/day</span>
          </div>
        </div>
      </div>

      {/* Shadow effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[160px] h-[20px] bg-black/20 rounded-full blur-md"></div>
    </motion.div>
  );
};
