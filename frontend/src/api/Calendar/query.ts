import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import {
  EditEvent,
  EventPagination,
  deleteEvent,
  patchEditEvent,
  postAddEvent,
  queryEventBetween,
} from './api';
import { t } from "@lingui/macro" 

export const getEventBetween = (pagination: EventPagination) => {
  return useQuery({
    queryKey: ['eventBetween', pagination],
    queryFn: () => queryEventBetween(pagination),
  });
};

export const mutateAddEvent = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['addEvent'],
    mutationFn: postAddEvent,
    onSuccess: () => {
      enqueueSnackbar(t({message:'Event added'}));
      queryClient.invalidateQueries({ queryKey: ['eventBetween'] });
    },
  });
};

export const mutateEditEvent = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['editEvent'],
    mutationFn: (event: EditEvent) => patchEditEvent(event),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Event edited'}));
      queryClient.invalidateQueries({ queryKey: ['eventBetween'] });
    },
  });
};

export const mutateDeleteEvent = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['deleteEvent'],
    mutationFn: (eventId: number) => deleteEvent(eventId),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Event deleted'}));
      queryClient.invalidateQueries({ queryKey: ['eventBetween'] });
    },
  });
};
