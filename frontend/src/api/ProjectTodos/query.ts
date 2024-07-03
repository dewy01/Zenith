import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import {
  AddProjectTodo,
  EditProjectTodo,
  ProjectTodo,
  postAddProjectTodo,
  postDeleteProjectTodo,
  postEditProjectTodo,
  queryProjectTodo,
  queryProjectTodoById,
} from './api';
import { t } from '@lingui/macro';
import { PaginationRequest, PaginationResponse } from '../pagination';

export const getProjectTodos = (isDone: boolean, pagination: PaginationRequest) => {
  return useInfiniteQuery<PaginationResponse<ProjectTodo>, Error>({
    queryKey: ['projectTodos', isDone, pagination.filter, pagination.pageNumber],
    queryFn: ({ pageParam = pagination.pageNumber }) => queryProjectTodo(isDone,{ ...pagination, pageNumber: pageParam as number } as PaginationRequest),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber < lastPage.totalPages) {
        return lastPage.pageNumber + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
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
      enqueueSnackbar(t({message:'Todo added'}));
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
      enqueueSnackbar(t({message:'Todo edited'}));
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
      enqueueSnackbar(t({message:'Todo deleted'}));
      queryClient.invalidateQueries({ queryKey: ['projectTodos'] });
    },
  });
};
