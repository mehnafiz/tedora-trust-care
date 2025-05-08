
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
    <div className="flex justify-between items-center mb-8">
      <Link to="/" className="flex items-center gap-2">
        <img 
          src="/lovable-uploads/73132813-1a1f-4e1d-9875-5f1998948f10.png" 
          alt="TEDora+ Logo" 
          className="h-12 w-auto rounded-full"
        />
        <span className="text-xl font-bold text-tedora-teal">TEDora+</span>
      </Link>
      <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2 hover:bg-tedora-teal/10 hover:text-tedora-teal">
        <LogOut size={16} />
        <span>Log out</span>
      </Button>
    </div>
  );
};
