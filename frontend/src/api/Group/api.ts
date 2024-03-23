import axios from 'axios';
import { BASE_URL } from '~/config/constants';

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

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('Auth-token');
  if (authToken) {
    config.headers.Authorization = authToken;
  }
  return config;
});


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
