import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { AddGroup, LeaveGroup, TokenDto, postAddGroup, postJoinGroup, postLeaveGroup, queryGroup, queryGroupToken, queryIsInGroup } from './api';

// export const getAllProjects = () => {
//   return useQuery({
//     queryKey: ['allProjects'],
//     queryFn: queryAllProjects,
//   });
// };

export const getGroup = () => {
  return useQuery({
    queryKey: ['getGroup'],
    queryFn: () => queryGroup(),
  });
};

export const getIsInGroup = () => {
  return useQuery({
    queryKey: ['getIsInGroup'],
    queryFn: () => queryIsInGroup(),
  });
};

export const gtInviteToken = (groupId:number) => {
  return useQuery({
    queryKey: ['getGroupToken'],
    queryFn: () => queryGroupToken(groupId),
    enabled:false,
    refetchOnWindowFocus:false,
    refetchOnMount:false,
  });
};

export const mutateAddGroup = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['addGroup'],
    mutationFn: (group : AddGroup) => postAddGroup(group),
    onSuccess: () => {
      enqueueSnackbar('Group created');
      queryClient.invalidateQueries({ queryKey: ['getIsInGroup'] });
      queryClient.invalidateQueries({ queryKey: ['getGroup'] });
    },
  });
};

export const mutateJoinGroup = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['joinGroup'],
    mutationFn: (token : TokenDto) => postJoinGroup(token),
    onSuccess: () => {
      enqueueSnackbar('Group joined');
      queryClient.invalidateQueries({ queryKey: ['getIsInGroup'] });
      queryClient.invalidateQueries({ queryKey: ['getGroup'] });
    },
    onError: ()=>{
      enqueueSnackbar({variant: 'error', message:'Invalid group code'})
    }
  });
};

export const mutateLeaveGroup = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['leaveGroup'],
    mutationFn: (groupId : LeaveGroup) => postLeaveGroup(groupId),
    onSuccess: () => {
      enqueueSnackbar('Group left');
      queryClient.invalidateQueries({ queryKey: ['getIsInGroup'] });
    },
  });
};

// export const mutateEditProject = () => {
//   const queryClient = useQueryClient();
//   const { enqueueSnackbar } = useSnackbar();
//   return useMutation({
//     mutationKey: ['editProject'],
//     mutationFn: (project:mutateProject) => editProjectById(project),
//     onSuccess: () => {
//       enqueueSnackbar('Project edited');
//       queryClient.invalidateQueries({ queryKey: ['projectById'] });
//       queryClient.invalidateQueries({ queryKey: ['allProjects'] });
//     },
//     onError: () => {},
//   });
// };

// export const deleteProject = () => {
//   const queryClient = useQueryClient();
//   const { enqueueSnackbar } = useSnackbar();
//   return useMutation({
//     mutationKey: ['deleteProject'],
//     mutationFn: (projectId: number) => deleteProjectById(projectId),
//     onSuccess: () => {
//       enqueueSnackbar('Project deleted');
//       queryClient.invalidateQueries({ queryKey: ['allProjects'] });
//     },
//     onError: () => {
//       enqueueSnackbar('Server connection error');
//     },
//   });
// };
