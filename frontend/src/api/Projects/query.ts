import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import {
  deleteProjectById,
  editProjectById,
  mutateProject,
  postAddProject,
  queryAllProjects,
  queryProjectID,
} from './api';
import { projectModel } from '~/View/ProjectView/schema';
import { t } from '@lingui/macro';

export const getAllProjects = () => {
  return useQuery({
    queryKey: ['allProjects'],
    queryFn: queryAllProjects,
  });
};

export const getProjectById = (projectId: string) => {
  return useQuery({
    queryKey: ['projectById', projectId],
    queryFn: () => queryProjectID(projectId),
  });
};

export const mutateAddProject = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['addProject'],
    mutationFn: (project : projectModel) => postAddProject(project),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Project added'}));
      queryClient.invalidateQueries({ queryKey: ['allProjects'] });
    },
  });
};

export const mutateEditProject = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['editProject'],
    mutationFn: (project:mutateProject) => editProjectById(project),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Project edited'}));
      queryClient.invalidateQueries({ queryKey: ['projectById'] });
      queryClient.invalidateQueries({ queryKey: ['allProjects'] });
    },
  });
};

export const deleteProject = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['deleteProject'],
    mutationFn: (projectId: number) => deleteProjectById(projectId),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Project deleted'}));
      queryClient.invalidateQueries({ queryKey: ['allProjects'] });
    },
  });
};
