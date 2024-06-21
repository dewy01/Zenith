import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { groupProjectModel } from '~/View/GroupView/GroupProjectView/schema';
import { useSnackbar } from 'notistack';
import {
  deleteGroupProjectById,
  editGroupProjectById,
  mutateProject,
  postAddGroupProject,
  queryAllGroupProjects,
  queryGroupProjectID,
} from './api';
import { t } from '@lingui/macro';
import { PaginationRequest } from '../pagination';

export const getAllGroupProjects = (pagination: PaginationRequest) => {
  return useQuery({
    queryKey: ['allGroupProjects',pagination.pageNumber,pagination.filter],
    queryFn: ()=>queryAllGroupProjects(pagination),
  });
};

export const getGroupProjectById = (projectId: string) => {
  return useQuery({
    queryKey: ['groupProjectById', projectId],
    queryFn: () => queryGroupProjectID(projectId),
  });
};

export const mutateAddGroupProject = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['addGroupProject'],
    mutationFn: (project : groupProjectModel) => postAddGroupProject(project),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Project added'}));
      queryClient.invalidateQueries({ queryKey: ['allGroupProjects'] });
    },
  });
};

export const mutateEditGroupProject = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['editGroupProject'],
    mutationFn: (project:mutateProject) => editGroupProjectById(project),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Project edited'}));
      queryClient.invalidateQueries({ queryKey: ['groupProjectById'] });
      queryClient.invalidateQueries({ queryKey: ['allGroupProjects'] });
    },
  });
};

export const deleteGroupProject = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['deleteGroupProject'],
    mutationFn: (projectId: number) => deleteGroupProjectById(projectId),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Project deleted'}));
      queryClient.invalidateQueries({ queryKey: ['allGroupProjects'] });
    },
  });
};
