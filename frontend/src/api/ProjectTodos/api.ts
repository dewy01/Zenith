import { axiosInstance } from '../api';

export interface ProjectTodo {
  projectTodoID: number;
  title: string;
  description: string;
  color: string;
  isDone: boolean;
}

export interface AddProjectTodo {
  title: string;
  description?: string;
  color: string;
}

export interface EditProjectTodo {
  projectId: number;
  project: AddProjectTodo;
}

export interface TodoById {
  title: string;
  description: string;
  color: string;
  todos: Todo[];
}

export interface Todo {
  todoID: number;
  title: string;
  description: string;
  isDone: boolean;
}

export const queryProjectTodo = async () => {
  const response = await axiosInstance.get(`/api/projectTodos/getAllProjects`);
  return response.data as ProjectTodo[];
};

export const queryProjectTodoById = async (projectId: number) => {
  const response = await axiosInstance.get(
    `/api/projectTodos/getById/${projectId}`,
  );
  return response.data as TodoById;
};

export const postAddProjectTodo = async (projectTodo: AddProjectTodo) => {
  return await axiosInstance.post('/api/projectTodos/addProject', projectTodo);
};

export const postEditProjectTodo = async (projectTodo: EditProjectTodo) => {
  return await axiosInstance.patch(
    `/api/projectTodos/updateProject/${projectTodo.projectId}`,
    projectTodo.project,
  );
};

export const postDeleteProjectTodo = async (projectTodoId: number) => {
  return await axiosInstance.delete(
    `/api/projectTodos/deleteProject/${projectTodoId}`,
  );
};
