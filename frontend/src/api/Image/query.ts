import { useMutation } from '@tanstack/react-query';
import {
  postImage,
} from './api';
import { useSnackbar } from 'notistack';
import { t } from '@lingui/macro';
import { queryClient } from '../api';

export const mutatePostImage = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['postImage'],
    mutationFn: (data: FormData) => postImage(data),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Avatar updated'}));
      queryClient.invalidateQueries({queryKey:['getMyAccount']})
    },
  });
};