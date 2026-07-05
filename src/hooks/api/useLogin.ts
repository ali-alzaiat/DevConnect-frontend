import { useLogin as useLoginGenerated } from '@/api/generated/auth/auth';
import type { LoginResponseDto } from '@/api/model';
import { getErrorMessage } from '@/lib/utils';
import { useLocation, useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  return useLoginGenerated({
    mutation: {
      onSuccess: (response) => {
        const { token } = response as LoginResponseDto;
        localStorage.setItem('accessToken', token);
        queryClient.invalidateQueries({ queryKey: ['/v1/auth/me'] });

        const searchParams = new URLSearchParams(location.search);
        const redirectTo = searchParams.get('redirectTo') || '/home';

        navigate(redirectTo, { replace: true });
      },
      onError: (error: Error) => {
        toast.error(getErrorMessage(error));
      }
    }
  });
};

export default useLogin;
