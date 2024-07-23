import { axiosInstance } from '../api';
import { projectModel } from '~/View/ProjectView/schema';
import { PaginationRequest, PaginationResponse } from '../pagination';

export interface Project {
  projectID: number;
  title: string;
  description: string;
  deadline: string;
  status: ProjectStatus;
  completion: number;
  isOutdated: boolean;
}

export interface ProjectTask {
  projectTaskID: number;
  title: string;
  description: string;
  category: string;
  status: ProjectTaskStatus;
}

export interface ProjectWithTasks {
  projectID: number;
  title: string;
  description: string;
  deadline: string;
  status: ProjectTaskStatus;
  projectTasks: ProjectTask[];
}

export interface ProjectByStatus {
  projectID: number;
  title: string;
  description: string;
  deadline: string;
  status: ProjectStatus;
  backlog: ProjectTask[];
  inProgress: ProjectTask[];
  review: ProjectTask[];
  closed: ProjectTask[];
}

export interface EditProject {
  Title: string;
  Description: string;
  Deadline: Date;
  Status: ProjectStatus;
}

export interface mutateProject {
  projectID: number;
  data: EditProject;
}

export interface AddProject {
  title: string;
  description: string;
  deadline: string;
  status: ProjectStatus;
}

export enum ProjectStatus {
  OnHold,
  InProgress,
  Done,
}

export enum ProjectTaskStatus {
  Backlog,
  InProgress,
  ForReview,
  Closed
}


export const queryAllProjects = async (pagination: PaginationRequest) => {
  const response = await axiosInstance.get('/api/projects/getAllProjects',{
    params:{
      pageNumber: pagination.pageNumber,
      pageSize: pagination.pageSize,
      filter: pagination.filter
    }
  });
  return response.data as PaginationResponse<Project>;
};

export const postAddProject = async (project: projectModel) => {
  return await axiosInstance.post('/api/projects/addProject', project);
};

export const queryProjectID = async (projectId: string) => {
  const response = await axiosInstance.get(
    `/api/projects/getProjectById/${projectId}`,
  );
  return response.data as ProjectByStatus;
};

export const editProjectById = async (project: mutateProject) => {
  return await axiosInstance.patch(
    `/api/projects/updateProject/${project.projectID}`,
    project.data,
  );
};

export const deleteProjectById = async (projectId: number) => {
  return await axiosInstance.delete(`/api/projects/deleteProject/${projectId}`);
};
