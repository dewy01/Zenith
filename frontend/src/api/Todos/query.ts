import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import {
  AddTodo,
  ToggleTodo,
  patchToggleTodo,
  postAddTodo,
  postDeleteTodo,
} from './api';
import { t } from '@lingui/macro';

export const mutateAddTodo = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['addTodo'],
    mutationFn: (todo: AddTodo) => postAddTodo(todo),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Task added'}));
      queryClient.invalidateQueries({ queryKey: ['projectTodoById'] });
    },
  });
};

export const mutateToggleTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['toggleTodo'],
    mutationFn: (todo: ToggleTodo) => patchToggleTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectTodoById'] });
      queryClient.invalidateQueries({ queryKey: ['projectTodos'] });
    },
  });
};

export const deleteTodo = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: (todoID: number) => postDeleteTodo(todoID),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Task deleted'}));
      queryClient.invalidateQueries({ queryKey: ['projectTodoById'] });
    },
  });
};
