import { groupProjectModel } from '~/View/GroupView/GroupProjectView/schema';
import { axiosInstance } from '../api';
import { PaginationRequest, PaginationResponse } from '../pagination';


export interface Project {
  groupProjectID: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
  completion: number;
  isOutdated: boolean;
}

export interface ProjectTask {
  projectTaskID: number;
  title: string;
  description: string;
  category: string;
  status: string;
  user:string;
  userImage:string;
  canEdit: boolean;
}

export interface ProjectWithTasks {
  projectID: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
  projectTasks: ProjectTask[];
}

export interface ProjectByStatus {
  projectID: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
  backlog: ProjectTask[];
  inProgress: ProjectTask[];
  review: ProjectTask[];
  closed: ProjectTask[];
}

export interface EditProject {
  Title: string;
  Description: string;
  Deadline: Date;
  Status: string;
}

export interface mutateProject {
  projectID: number;
  data: EditProject;
}

export interface AddProject {
  title: string;
  description: string;
  deadline: string;
  status: string;
}

export const queryAllGroupProjects = async (pagination: PaginationRequest) => {
  const response = await axiosInstance.get('/api/group-projects/getAllGroupProjects',{
    params:{
      pageNumber: pagination.pageNumber,
      pageSize: pagination.pageSize,
      filter: pagination.filter
    }
  });
  return response.data as PaginationResponse<Project>;
};

export const postAddGroupProject = async (project: groupProjectModel) => {
  return await axiosInstance.post('/api/group-projects/addGroupProject', project);
};

export const queryGroupProjectID = async (projectId: string) => {
  const response = await axiosInstance.get(
    `/api/group-projects/getGroupProjectById/${projectId}`,
  );
  return response.data as ProjectByStatus;
};

export const editGroupProjectById = async (project: mutateProject) => {
  return await axiosInstance.patch(
    `/api/group-projects/updateGroupProject/${project.projectID}`,
    project.data,
  );
};

export const deleteGroupProjectById = async (projectId: number) => {
  return await axiosInstance.delete(`/api/group-projects/deleteGroupProject/${projectId}`);
};
