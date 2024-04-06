import { axiosInstance } from '../api';

export interface AddTodo {
  projectTodoID: number;
  title: string;
  description: string;
}

export interface ToggleTodo {
  todoID: number;
  isDone: boolean;
}

export const postAddTodo = async (todo: AddTodo) => {
  return await axiosInstance.post('/api/todos/addTodo', todo);
};

export const patchToggleTodo = async (todo: ToggleTodo) => {
  return await axiosInstance.patch(`/api/todos/toggleStatus/${todo.todoID}`, {
    isDone: todo.isDone,
  });
};

export const postDeleteTodo = async (todoID: number) => {
  return await axiosInstance.delete(`/api/todos/deleteTodo/${todoID}`);
};
