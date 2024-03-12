import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import {
  AddTodo,
  ToggleTodo,
  patchToggleTodo,
  postAddTodo,
  postDeleteTodo,
} from './api';

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

export const mutateToggleTodo = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['toggleTodo'],
    mutationFn: (todo: ToggleTodo) => patchToggleTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectTodoById'] });
    },
    onError: () => {
      enqueueSnackbar('Server connection error');
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
      enqueueSnackbar('Task deleted');
      queryClient.invalidateQueries({ queryKey: ['projectTodoById'] });
    },
    onError: () => {
      enqueueSnackbar('Server connection error');
    },
  });
};
