import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { Settings, editSettings, querySettings } from './api';

export const getSettings = () => {
  return useQuery({
    queryKey: ['allSettings'],
    queryFn: querySettings,
  });
};

export const mutateEditSettings = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['editSettings'],
    mutationFn: (preferences: Settings) => editSettings(preferences),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allSettings'] });
    },
    onError: () => {enqueueSnackbar('Server connection error');},
  });
};
