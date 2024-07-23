import { axiosInstance } from '../api';
import { ProjectTaskStatus } from '../Projects/api';

export interface ProjectTask {
  projectTaskID: number;
  title: string;
  description: string;
  status: ProjectTaskStatus;
}

export interface EditProjectTask {
  title: string;
  description: string;
  category: string;
  status: ProjectTaskStatus;
}

export interface MutateProjectTask {
  projectTaskID: number;
  data: EditProjectTask;
}

interface ChangeProjectStatus {
  status: ProjectTaskStatus
}

export interface changeTaskStatus {
  projectTaskID: string;
  status: ChangeProjectStatus;
}

export interface AddProjectTask {
  projectID: number;
  title: string;
  description: string;
  category: string;
  status: ProjectTaskStatus;
}

export interface TaskCategory {
  category:
    | 'Note'
    | 'Email'
    | 'Meeting'
    | 'Research'
    | 'Design'
    | 'Development'
    | 'Maintenance';
}


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
