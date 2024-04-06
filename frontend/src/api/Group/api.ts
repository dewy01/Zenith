import { axiosInstance } from '../api';

export interface User {
  userID: number;
  username: string;
  email: string;
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
  users: User[];
  groupProjects: GroupProject[];
}

export interface AddGroup{
  groupName: string;
}


export const postAddGroup = async (group: AddGroup) => {
  return await axiosInstance.post('/api/groups/addGroup', group);
};

export const queryGroup = async () => {
  const response = await axiosInstance.get(`/api/groups/getGroup`);
  return response.data as Group;
};

export const queryIsInGroup = async () => {
  const response = await axiosInstance.get(`/api/groups/isInGroup`);
  return response.data as boolean;
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
