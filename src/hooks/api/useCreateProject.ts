import {
  useCreateProject as useGeneratedCreateProject,
  getGetAllProjectsQueryKey
} from '@/api/generated/projects/projects';
import { useQueryClient } from '@tanstack/react-query';

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useGeneratedCreateProject({
    mutation: {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: getGetAllProjectsQueryKey({}) });
      }
    }
  });
};
