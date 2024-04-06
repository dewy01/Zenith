import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Settings, editSettings, querySettings } from './api';
import { useAuth } from '~/context/AuthContext';

export const getSettings = () => {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ['allSettings'],
    queryFn: querySettings,
    enabled: isAuthenticated
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
