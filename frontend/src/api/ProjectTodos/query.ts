import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import {
  AddProjectTodo,
  EditProjectTodo,
  postAddProjectTodo,
  postDeleteProjectTodo,
  postEditProjectTodo,
  queryProjectTodo,
  queryProjectTodoById,
} from './api';

export const getProjectTodos = () => {
  return useQuery({
    queryKey: ['projectTodos'],
    queryFn: queryProjectTodo,
  });
};

export const getProjectTodoById = (projectId: number) => {
  return useQuery({
    queryKey: ['projectTodoById', projectId],
    queryFn: () => queryProjectTodoById(projectId),
  });
};

export const mutateAddProjectTodo = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['addProjectTodo'],
    mutationFn: (projectTask: AddProjectTodo) =>
      postAddProjectTodo(projectTask),
    onSuccess: () => {
      enqueueSnackbar('Todo added');
      queryClient.invalidateQueries({ queryKey: ['projectTodos'] });
    },
  });
};

export const mutateEditProjectTodo = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['editProjectTodo'],
    mutationFn: (projectTask: EditProjectTodo) =>
      postEditProjectTodo(projectTask),
    onSuccess: () => {
      enqueueSnackbar('Todo edited');
      queryClient.invalidateQueries({ queryKey: ['projectTodos'] });
      queryClient.invalidateQueries({ queryKey: ['projectTodoById'] });
    },
  });
};

export const deleteProjectTodo = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['deleteProjectTodo'],
    mutationFn: (projectTaskId: number) => postDeleteProjectTodo(projectTaskId),
    onSuccess: () => {
      enqueueSnackbar('Todo deleted');
      queryClient.invalidateQueries({ queryKey: ['projectTodos'] });
    },
  });
};
