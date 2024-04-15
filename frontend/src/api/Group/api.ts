import { axiosInstance } from '../api';

export interface GroupUser {
  userID: number;
  username: string;
  email: string;
  isMe: boolean;
}

export interface GroupProject {
  groupProjectID: number;
  title: string;
  description: string;
  deadline: Date;
  status: string;
  completion: number;
}

export interface Group {
  groupID: number;
  groupName: string;
  users: GroupUser[];
  groupProjects: GroupProject[];
}

export interface AddGroup{
  groupName: string;
}

export interface TokenDto {
  token:string
}

export interface LeaveGroup {
  groupID:number
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

export const queryGroupToken = async (groupId:number) => {
  const response = await axiosInstance.get(`/api/groups/getInviteToken/${groupId}`);
  return response.data as string;
};

// export const editProjectById = async (project: mutateProject) => {
//   return await axiosInstance.patch(
//     `/api/projects/updateProject/${project.projectID}`,
//     project.data,
//   );
// };

// export const deleteProjectById = async (projectId: number) => {
//   return await axiosInstance.delete(`/api/projects/deleteProject/${projectId}`);
// };
