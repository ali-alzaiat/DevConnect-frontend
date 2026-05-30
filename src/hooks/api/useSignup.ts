import { useSignup as useSignupGenerated } from '@/api/generated/auth/auth';
import { getErrorMessage } from '@/lib/utils';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const useSignup = () => {
  const navigate = useNavigate();
  return useSignupGenerated({
    mutation: {
      onSuccess: () => {
        navigate('/login');
        toast.success('Account created successfully');
      },
      onError(error: Error) {
        toast.error(getErrorMessage(error));
      }
    }
  });
};

export default useSignup;
