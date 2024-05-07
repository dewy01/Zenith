import { axiosInstance } from '../api';

export interface GroupUser {
  userID: number;
  username: string;
  userRole: GroupRole;
  email: string;
  isMe: boolean;
}

export enum GroupRole {
  User,
  Moderator,
  Admin,
}

export interface GroupProject {
  groupProjectID: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
  completion: number;
}

export interface Group {
  groupID: number;
  groupName: string;
  users: GroupUser[];
}

export interface AddGroup {
  groupName: string;
}

export interface TokenDto {
  token: string;
}

export interface LeaveGroup {
  groupID: number;
}

export interface ChangeRole {
  userId: number;
}

export const postAddGroup = async (group: AddGroup) => {
  return await axiosInstance.post('/api/groups/addGroup', group);
};

export const postJoinGroup = async (token: TokenDto) => {
  return await axiosInstance.post('/api/groups/joinGroup', token);
};

export const postLeaveGroup = async (groupId: LeaveGroup) => {
  return await axiosInstance.post('/api/groups/leaveGroup', groupId);
};

export const queryGroup = async () => {
  const response = await axiosInstance.get(`/api/groups/getGroup`);
  return response.data as Group;
};

export const queryIsInGroup = async () => {
  const response = await axiosInstance.get(`/api/groups/isInGroup`);
  return response.data as boolean;
};

export const queryGroupToken = async (groupId: number) => {
  const response = await axiosInstance.get(
    `/api/groups/getInviteToken/${groupId}`,
  );
  return response.data as string;
};

export const queryOwnRole = async () => {
  const response = await axiosInstance.get(`/api/groups/getOwnRole`);
  return response.data as GroupRole;
};

export const changeRole = async (item: ChangeRole) => {
  return await axiosInstance.patch('/api/groups/changeRole', item);
};

export const setAdmin = async (item: ChangeRole) => {
  return await axiosInstance.patch('/api/groups/setAdmin', item);
};
