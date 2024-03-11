import axios from 'axios';
import { BASE_URL } from '~/config/constants';

export interface AddTodo {
  projectTodoID: number;
  title: string;
  description: string;
}

export interface ToggleTodo {
  todoID: number;
  isDone: boolean;
}

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('Auth-token');
  if (authToken) {
    config.headers.Authorization = authToken;
  }
  return config;
});

export const postAddTodo = async (todo: AddTodo) => {
  return await axiosInstance.post('/api/todos/addTodo', todo);
};

export const patchToggleTodo = async (todo: ToggleTodo) => {
  return await axiosInstance.patch(`/api/todos/toggleStatus/${todo.todoID}`, {isDone: todo.isDone});
};