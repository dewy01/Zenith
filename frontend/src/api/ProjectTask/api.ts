import axios from 'axios';
import { BASE_URL } from '~/config/constants';

export interface ProjectTask {
  projectTaskID: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
}

export interface EditProjectTask {
  title: string;
  description: string;
  category: string;
  status: string;
}

export interface MutateProjectTask {
  projectTaskID: number;
  data: EditProjectTask;
}

export interface ProjectTaskStatus {
  status: string;
}

export interface changeTaskStatus {
  projectTaskID: string;
  status: ProjectTaskStatus;
}

export interface AddProjectTask {
  projectID: number;
  title: string;
  description: string;
  category: string;
  status: string;
}

export interface TaskCategory {
  category:
    | 'Note'
    | 'Email'
    | 'Accounting'
    | 'Meeting'
    | 'Presentation'
    | 'Research'
    | 'Design'
    | 'Development'
    | 'Testing'
    | 'Maintenance';
}

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('Auth-token');
  if (authToken) {
    config.headers.Authorization = authToken;
  }
  return config;
});

export const queryProjectTaskById = async (projectTaskId: number) => {
  const response = await axiosInstance.get(
    `/api/projectTask/getProjectTaskById/${projectTaskId}`,
  );
  return response.data as ProjectTask;
};

export const postAddProjectTask = async (projectTask: AddProjectTask) => {
  return await axiosInstance.post(
    '/api/projectTask/addProjectTask',
    projectTask,
  );
};

export const editProjectTaskById = async (projectTask: MutateProjectTask) => {
  return await axiosInstance.patch(
    `/api/projectTask/updateProjectTask/${projectTask.projectTaskID}`,
    projectTask.data,
  );
};

export const changeProjectStatus = async (projectTask: changeTaskStatus) => {
  return await axiosInstance.patch(
    `/api/projectTask/changeStatus/${projectTask.projectTaskID}`,
    projectTask.status,
  );
};

export const deleteProjectTaskById = async (projectTaskId: number) => {
  return await axiosInstance.delete(
    `/api/projectTask/deleteProjectTask/${projectTaskId}`,
  );
};
