import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import {
  AddProjectTask,
  MutateProjectTask,
  changeProjectStatus,
  changeTaskStatus,
  deleteProjectTaskById,
  editProjectTaskById,
  postAddProjectTask,
  queryProjectTaskById,
} from './api';

export const getProjectTaskById = (projectTaskId: number) => {
  return useQuery({
    queryKey: ['projectTaskById', projectTaskId],
    queryFn: () => queryProjectTaskById(projectTaskId),
  });
};

export const mutateAddProjectTask = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['addProjectTask'],
    mutationFn: (projectTask: AddProjectTask) => postAddProjectTask(projectTask),
    onSuccess: () => {
      enqueueSnackbar('Project task added');
      queryClient.invalidateQueries({ queryKey: ['projectById'] });
    },
    onError: () => {
      enqueueSnackbar('Server connection error');
    },
  });
};

export const mutateEditProjectTask = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['editProjectTask'],
    mutationFn: (projectTask: MutateProjectTask) => editProjectTaskById(projectTask),
    onSuccess: () => {
      enqueueSnackbar('Project task edited');
      queryClient.invalidateQueries({ queryKey: ['projectTaskById'] });
    },
    onError: () => {},
  });
};

export const mutateChangeTaskStatus = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['changeStatus'],
    mutationFn: (projectTask: changeTaskStatus) => changeProjectStatus(projectTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectTaskById'] });
    },
    onError: () => {},
  });
};

export const deleteProjectTask = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['deleteProjectTask'],
    mutationFn: (projectTaskId: number) => deleteProjectTaskById(projectTaskId),
    onSuccess: () => {
      enqueueSnackbar('Project task deleted');
      queryClient.invalidateQueries({ queryKey: ['projectTaskById'] });
    },
    onError: () => {
      enqueueSnackbar('Server connection error');
    },
  });
};