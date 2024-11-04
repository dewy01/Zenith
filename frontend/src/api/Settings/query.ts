import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '~/context/AuthContext';
import { Settings, editSettings, querySettings } from './api';

export const getSettings = () => {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ['allSettings'],
    queryFn: querySettings,
    enabled: isAuthenticated,
    retryDelay: 10
  });
};

export const mutateEditSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['editSettings'],
    mutationFn: (preferences: Settings) => editSettings(preferences),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allSettings'] });
    },
  });
};
