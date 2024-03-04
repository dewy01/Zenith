import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {  useSnackbar } from 'notistack';
import { postAddNote, queryAllNotes } from "./api";

export const getAllNotes = () => {
    return useQuery({
        queryKey: ['allNotes'],
        queryFn: queryAllNotes,
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