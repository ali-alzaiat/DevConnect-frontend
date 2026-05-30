import { useCheckLoginStatus as useCheckLoginStatusGenerated } from '@/api/generated/auth/auth';

const useCheckLoginStatus = () => {
  return useCheckLoginStatusGenerated();
};

export default useCheckLoginStatus;
