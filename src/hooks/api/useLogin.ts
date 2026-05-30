import { useLogin as useLoginGenerated } from '@/api/generated/auth/auth';
import { getErrorMessage } from '@/lib/utils';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';

const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return useLoginGenerated({
    mutation: {
      onSuccess: (response) => {
        localStorage.setItem('accessToken', response.token);

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
