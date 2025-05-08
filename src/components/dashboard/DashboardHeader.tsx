
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center mb-8 py-2">
      <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-r from-tedora-teal to-tedora-tealLight p-0.5">
          <img 
            src="/lovable-uploads/73132813-1a1f-4e1d-9875-5f1998948f10.png" 
            alt="TEDora+ Logo" 
            className="h-full w-full object-contain rounded-full bg-transparent"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-tedora-teal font-playfair">TEDora+</span>
          <span className="text-xs font-light text-tedora-charcoal/80 -mt-0.5">Trust Everyday Care</span>
        </div>
      </Link>
      <Button 
        variant="ghost" 
        onClick={handleLogout} 
        className="flex items-center gap-2 hover:bg-tedora-teal/10 hover:text-tedora-teal border border-transparent hover:border-tedora-teal/20 transition-all duration-300"
      >
        <LogOut size={16} />
        <span>Log out</span>
      </Button>
    </div>
  );
};
