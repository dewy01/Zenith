import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import {
  AddGroupProjectTask,
  MutateProjectTask,
  changeGroupProjectTaskStatus,
  changeTaskStatus,
  deleteGroupProjectTaskById,
  editGroupProjectTaskById,
  postAddGroupProjectTask,
  queryProjectTaskById,
} from './api';

export const getProjectTaskById = (projectTaskId: number) => {
  return useQuery({
    queryKey: ['projectTaskById', projectTaskId],
    queryFn: () => queryProjectTaskById(projectTaskId),
  });
};

export const mutateAddGroupProjectTask = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['addGroupProjectTask'],
    mutationFn: (projectTask: AddGroupProjectTask) =>
      postAddGroupProjectTask(projectTask),
    onSuccess: () => {
      enqueueSnackbar('Project task added');
      queryClient.invalidateQueries({ queryKey: ['groupProjectById'] });
    },
  });
};

export const mutateEditGroupProjectTask = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['editGroupProjectTask'],
    mutationFn: (projectTask: MutateProjectTask) =>
      editGroupProjectTaskById(projectTask),
    onSuccess: () => {
      enqueueSnackbar('Project task edited');
      queryClient.invalidateQueries({ queryKey: ['groupProjectById'] });
    },
  });
};

export const mutateChangeGroupTaskStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['changeGroupStatus'],
    mutationFn: (projectTask: changeTaskStatus) =>
      changeGroupProjectTaskStatus(projectTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupProjectById'] });
    },
  });
};

export const deleteGroupProjectTask = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['deleteGroupProjectTask'],
    mutationFn: (projectTaskId: number) => deleteGroupProjectTaskById(projectTaskId),
    onSuccess: () => {
      enqueueSnackbar('Project task deleted');
      queryClient.invalidateQueries({ queryKey: ['groupProjectById'] });
    },
  });
};
