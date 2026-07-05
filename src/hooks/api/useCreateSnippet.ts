import {
  useCreateSnippet as useGeneratedCreateSnippet,
  getGetAllSnippetsQueryKey
} from '@/api/generated/snippets/snippets';
import { useQueryClient } from '@tanstack/react-query';

export const useCreateSnippet = () => {
  const queryClient = useQueryClient();
  return useGeneratedCreateSnippet({
    mutation: {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: getGetAllSnippetsQueryKey() });
      }
    }
  });
};
