import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import {
  Note,
  deleteNoteById,
  editNoteById,
  postAddNote,
  queryAllNotes,
  queryNoteByID,
  queryNoteFromToken,
  queryShareToken,
} from './api';
import { t } from '@lingui/macro';
import { PaginationResponse, PaginationRequest } from '../pagination';


export const getAllNotes = (pagination: PaginationRequest) => {
  return useInfiniteQuery<PaginationResponse<Note>, Error>({
    queryKey: ['allNotes', pagination.filter, pagination.pageNumber],
    queryFn: ({ pageParam = pagination.pageNumber }) => queryAllNotes({ ...pagination, pageNumber: pageParam as number }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber < lastPage.totalPages) {
        return lastPage.pageNumber + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
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
