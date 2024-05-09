import { axiosInstance } from '../api';

export interface GroupProjectTask {
  projectTaskID: number;
  title: string;
  description: string;
  category: string;
  status: string;
  user:string;
}

export interface EditProjectTask {
  title: string;
  description: string;
  category: string;
  status: string;
  userId: number;
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

export interface AddGroupProjectTask {
  projectID: number;
  title: string;
  description: string;
  category: string;
  status: string;
  userId: number;
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
  return response.data as GroupProjectTask;
};

export const postAddGroupProjectTask = async (projectTask: AddGroupProjectTask) => {
  return await axiosInstance.post(
    '/api/groupProjectTask/add',
    projectTask,
  );
};

export const editGroupProjectTaskById = async (projectTask: MutateProjectTask) => {
  return await axiosInstance.patch(
    `/api/groupProjectTask/update/${projectTask.projectTaskID}`,
    projectTask.data,
  );
};

export const changeGroupProjectTaskStatus = async (projectTask: changeTaskStatus) => {
  return await axiosInstance.patch(
    `/api/groupProjectTask/changeStatus/${projectTask.projectTaskID}`,
    projectTask.status,
  );
};

export const deleteGroupProjectTaskById = async (projectTaskId: number) => {
  return await axiosInstance.delete(
    `/api/groupProjectTask/delete/${projectTaskId}`,
  );
};
