import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { AddTodo, postAddTodo } from './api';

export const mutateAddTodo = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['addTodo'],
    mutationFn: (todo: AddTodo) => postAddTodo(todo),
    onSuccess: () => {
      enqueueSnackbar('Todo added');
      queryClient.invalidateQueries({ queryKey: ['projectTodoById'] });
    },
    onError: () => {
      enqueueSnackbar('Server connection error');
    },
  });
};
