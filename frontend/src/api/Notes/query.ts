import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import {
  deleteNoteById,
  editNoteById,
  postAddNote,
  queryAllNotes,
  queryNoteByID,
  queryNoteFromToken,
  queryShareToken,
} from './api';
import { t } from '@lingui/macro';

export const getAllNotes = () => {
  return useQuery({
    queryKey: ['allNotes'],
    queryFn: queryAllNotes,
  });
};

export const getNoteById = (noteId: number) => {
  return useQuery({
    queryKey: ['noteById', noteId],
    queryFn: () => queryNoteByID(noteId),
  });
};

export const mutateAddNote = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['addNote'],
    mutationFn: postAddNote,
    onSuccess: () => {
      enqueueSnackbar(t({message:'Note added'}));
      queryClient.invalidateQueries({ queryKey: ['allNotes'] });
    },
  });
};

type editProps = {
  title: string;
  content: string;
};

type EditNote = {
  noteId: number;
  note: editProps;
};

export const mutateEditNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['editNote'],
    mutationFn: (note: EditNote) => editNoteById(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['noteById'] });
      queryClient.invalidateQueries({ queryKey: ['allNotes'] });
    },
  });
};

export const deleteNote = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['deleteNote'],
    mutationFn: (noteId: number) => deleteNoteById(noteId),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Note deleted'}));
      queryClient.invalidateQueries({ queryKey: ['allNotes'] });
    },
  });
};

export const getShareToken = (noteId: number) => {
  return useQuery({
    queryKey: ['shareToken', noteId],
    queryFn: () => queryShareToken(noteId),
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const getNoteFromToken = (token: string) => {
  return useQuery({
    queryKey: ['noteFromToken'],
    queryFn: () => queryNoteFromToken(token),
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
