import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import {
  AddProject,
  EditProject,
  deleteNoteById,
  editNoteById,
  postAddProject,
  queryAllProjects,
  queryProjectID,
} from './api';
import { projectModel } from '~/View/ProjectView/schema';

export const getAllProjects = () => {
  return useQuery({
    queryKey: ['allProjects'],
    queryFn: queryAllProjects,
  });
};

export const getProjectById = (projectId: number) => {
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
      enqueueSnackbar('Project added');
      queryClient.invalidateQueries({ queryKey: ['allProjects'] });
    },
    onError: () => {
      enqueueSnackbar('Server connection error');
    },
  });
};

export const mutateEditProject = (project: EditProject, projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['editProject'],
    mutationFn: () => editNoteById(project, projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectById', projectId] });
      queryClient.invalidateQueries({ queryKey: ['allProjects'] });
    },
    onError: () => {},
  });
};

export const deleteProject = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['deleteProject'],
    mutationFn: (projectId: number) => deleteNoteById(projectId),
    onSuccess: () => {
      enqueueSnackbar('Project deleted');
      queryClient.invalidateQueries({ queryKey: ['allProjects'] });
    },
    onError: () => {
      enqueueSnackbar('Server connection error');
    },
  });
};
