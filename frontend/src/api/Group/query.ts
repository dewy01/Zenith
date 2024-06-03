import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import {
  AddGroup,
  ChangeRole,
  EditGroup,
  GroupRole,
  LeaveGroup,
  TokenDto,
  changeRole,
  deleteGroup,
  postAddGroup,
  postJoinGroup,
  postLeaveGroup,
  queryGroup,
  queryGroupToken,
  queryIsInGroup,
  queryOwnRole,
  setAdmin,
  updateGroup,
} from './api';
import { useGroupContext } from '~/context/GroupRole';
import { t } from '@lingui/macro';

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

export const getOwnRole = () => {
  return useQuery({
    queryKey: ['getOwnRole'],
    queryFn: () => queryOwnRole(),
  });
};

export const getInviteToken = (groupId: number) => {
  return useQuery({
    queryKey: ['getGroupToken'],
    queryFn: () => queryGroupToken(groupId),
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const mutateAddGroup = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['addGroup'],
    mutationFn: (group: AddGroup) => postAddGroup(group),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Group created'}));
      queryClient.invalidateQueries({ queryKey: ['getIsInGroup'] });
      queryClient.invalidateQueries({ queryKey: ['getGroup'] });
    },
  });
};

export const mutateUpdateGroup = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['editGroup'],
    mutationFn: (group: EditGroup) => updateGroup(group),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Group updated'}));
      queryClient.invalidateQueries({ queryKey: ['getGroup'] });
    },
  });
};

export const mutateJoinGroup = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['joinGroup'],
    mutationFn: (token: TokenDto) => postJoinGroup(token),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Group joined'}));
      queryClient.invalidateQueries({ queryKey: ['getIsInGroup'] });
      queryClient.invalidateQueries({ queryKey: ['getGroup'] });
    },
    onError: () => {
      enqueueSnackbar({ variant: 'error', message: t({message:'Invalid group code'}) });
    },
  });
};

export const mutateLeaveGroup = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['leaveGroup'],
    mutationFn: (groupId: LeaveGroup) => postLeaveGroup(groupId),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Group left'}));
      queryClient.invalidateQueries({ queryKey: ['getIsInGroup'] });
    },
  });
};

export const mutateDeleteGroup = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['deleteGroup'],
    mutationFn: (groupId: number) => deleteGroup(groupId),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Group deleted'}));
      queryClient.invalidateQueries({ queryKey: ['getIsInGroup'] });
    },
  });
};

export const mutateChangeRole = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['changeRole'],
    mutationFn: (item: ChangeRole) => changeRole(item),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Role changed'}));
      queryClient.invalidateQueries({ queryKey: ['getGroup'] });
    },
  });
};

export const mutateSetAdmin = () => {
  const { setUserRole } = useGroupContext();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['setAdmin'],
    mutationFn: (item: ChangeRole) => setAdmin(item),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Admin user changed'}));
      setUserRole(GroupRole.User);
      queryClient.invalidateQueries({ queryKey: ['getGroup'] });
      queryClient.invalidateQueries({ queryKey: ['getOwnRole'] });
    },
  });
};
