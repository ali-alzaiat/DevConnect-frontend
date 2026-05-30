import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem('accessToken');
    queryClient.clear();
    toast.success('You have been logged out.');
    navigate('/login', { replace: true });
  };

  return { logout };
};
