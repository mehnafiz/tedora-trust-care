
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
          src="/lovable-uploads/47c58735-b6ab-46e9-8705-6f0e66f3ed34.png" 
          alt="TEDora+ Logo" 
          className="h-12 w-auto rounded-full"
        />
        <span className="text-xl font-bold text-[#6BA8A9]">TEDora+</span>
      </Link>
      <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
        <LogOut size={16} />
        <span>Log out</span>
      </Button>
    </div>
  );
};
