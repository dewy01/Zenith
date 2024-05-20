import { useMutation, useQuery, useQueryClient  } from '@tanstack/react-query';
import { patchMarkAsRead, queryAllNotifications } from './api';

export const getAllNotifications = () => {
  return useQuery({
    queryKey: ['allNotifications'],
    queryFn: queryAllNotifications,
  });
};

export const mutateMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['markAsRead'],
    mutationFn: (id:number) =>
      patchMarkAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allNotifications'] });
    },
  });
};