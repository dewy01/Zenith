
import axios from 'axios';
import { BASE_URL } from '../../config/constants';

export interface NoteList {
    noteID: number;
    title: string;
    content: string;
    createdAt: string;
  }

const axiosInstance = axios.create({baseURL: BASE_URL});

axiosInstance.interceptors.request.use(
    (config) => {
      const authToken = localStorage.getItem('Auth-token');
      if (authToken) {
        config.headers.Authorization = authToken;
      }
      return config;
    }
);

export const queryAllNotes = async () => {
    const response = await axiosInstance.get('/api/notes/getAllNotes');
    return response.data as NoteList[];
};

export const postAddNote = async () => {
    return (await axiosInstance.post('/api/notes/addNote'));
};