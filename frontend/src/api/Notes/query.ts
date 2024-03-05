import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {  useSnackbar } from 'notistack';
import { deleteNoteById, editNoteById, postAddNote, queryAllNotes, queryNoteByID } from "./api";

export const getAllNotes = () => {
    return useQuery({
        queryKey: ['allNotes'],
        queryFn: queryAllNotes,
    });
}

export const getNoteById = (noteId:number) => {
    return useQuery({
        queryKey: ['noteById',noteId],
        queryFn: () => queryNoteByID(noteId),
    });
}

export const mutateAddNote = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar()
    return useMutation({
        mutationKey: ['addNote'],
        mutationFn: postAddNote,
        onSuccess: ()=> {
            enqueueSnackbar('Note added');
            queryClient.invalidateQueries({queryKey:["allNotes"]});
        },
        onError: ()=>{
            enqueueSnackbar('Server conntection error') 
        }
    });
}

type editProps={
    title:string,
    content:string
}

export const mutateEditNote = (note:editProps,noteId:number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['editNote'],
        mutationFn: () => editNoteById(note, noteId),
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey:["allNotes,noteById"]});
        },
        onError: ()=>{
        }
    });
}

export const deleteNote = () => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar()
    return useMutation({
        mutationKey: ['deleteNote'],
        mutationFn: (noteId: number)=> deleteNoteById(noteId),
        onSuccess: ()=> {
            enqueueSnackbar('Note deleted');
            queryClient.invalidateQueries({queryKey:["allNotes"]});
        },
        onError: ()=>{
            enqueueSnackbar('Server conntection error') 
        }
    });
}