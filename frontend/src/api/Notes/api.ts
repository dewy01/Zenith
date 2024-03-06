import axios from 'axios';
import { BASE_URL } from '~/config/constants';

export interface Note {
  noteID: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface editNote {
  title: string;
  content: string;
}

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('Auth-token');
  if (authToken) {
    config.headers.Authorization = authToken;
  }
  return config;
});

export const queryAllNotes = async () => {
  const response = await axiosInstance.get('/api/notes/getAllNotes');
  return response.data as Note[];
};

export const postAddNote = async () => {
  return await axiosInstance.post('/api/notes/addNote');
};

export const queryNoteByID = async (noteId: number) => {
  const response = await axiosInstance.get(`/api/notes/getNoteById/${noteId}`);
  console.log(response.data);
  return response.data as Note;
};

export const editNoteById = async (note: editNote, noteId: number) => {
  return await axiosInstance.patch(`/api/notes/updateNote/${noteId}`, note);
};

export const deleteNoteById = async (noteId: number) => {
  return await axiosInstance.delete(`/api/notes/deleteNote/${noteId}`);
};
