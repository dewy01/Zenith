import axios from 'axios';
import { projectModel } from '~/View/ProjectView/schema';
import { BASE_URL } from '~/config/constants';

export interface Project {
  projectID: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
}

export interface ProjectTask {
  projectTaskID: number;
  title: string;
  category: string;
  status: string;
}

export interface ProjectWithTasks {
  projectID: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
  projectTasks: ProjectTask[];
}

export interface EditProject {
  Title: string;
  Description: string;
  Deadline: string;
  Status: string;
}

export interface AddProject {
  title: string;
  description: string;
  deadline: string;
  status: string;
}

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('Auth-token');
  if (authToken) {
    config.headers.Authorization = authToken;
  }
  return config;
});

export const queryAllProjects = async () => {
  const response = await axiosInstance.get('/api/projects/getAllProjects');
  return response.data as Project[];
};

export const postAddProject = async (project: projectModel) => {
  return await axiosInstance.post('/api/projects/addProject',project);
};

export const queryProjectID = async (projectId: number) => {
  const response = await axiosInstance.get(`/api/projects/getProjectById/${projectId}`);
  console.log(response.data);
  return response.data as ProjectWithTasks;
};

export const editNoteById = async (project: EditProject, projectId: number) => {
  return await axiosInstance.patch(`/api/projects/updateProject/${projectId}`, project);
};

export const deleteNoteById = async (projectId: number) => {
  return await axiosInstance.delete(`/api/projects/deleteProject/${projectId}`);
};

