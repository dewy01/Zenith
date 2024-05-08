import { axiosInstance } from '../api';

export interface Note {
  noteID: number;
  title: string;
  content: string;
  createdAt: string;
}

type EditNote = {
  noteId: number;
  note: editProps;
};
type editProps = {
  title: string;
  content: string;
};

export const queryAllNotes = async () => {
  const response = await axiosInstance.get('/api/notes/getAllNotes');
  return response.data as Note[];
};

export const postAddNote = async () => {
  return await axiosInstance.post('/api/notes/addNote');
};

export const queryNoteByID = async (noteId: number) => {
  const response = await axiosInstance.get(`/api/notes/getNoteById/${noteId}`);
  return response.data as Note;
};

export const editNoteById = async (note: EditNote) => {
  return await axiosInstance.patch(
    `/api/notes/updateNote/${note.noteId}`,
    note.note,
  );
};

export const deleteNoteById = async (noteId: number) => {
  return await axiosInstance.delete(`/api/notes/deleteNote/${noteId}`);
};

export const queryShareToken = async (noteId: number) => {
  const response = await axiosInstance.get(
    `/api/notes/getShareToken/${noteId}`,
  );
  return response.data as string;
};

export const queryNoteFromToken = async (token: string) => {
  const response = await axiosInstance.get(
    `/api/notes/getNoteFromToken/${token}`,
  );
  return response.data as Note;
};
