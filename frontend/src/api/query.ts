import { useMutation } from "@tanstack/react-query"
import { postUserLogin, postUserRegister } from "./api";
import { registerFormSchema } from "../View/RegisterView/schema";
import { loginFormSchema } from "../View/LoginView/schema";
import { useAuth } from "../context/AuthContext";
import {  useSnackbar } from 'notistack';


export const mutateUserRegister = () => {
    const { enqueueSnackbar } = useSnackbar()
    return useMutation({
        mutationKey: ['register'],
        mutationFn: (userData: registerFormSchema) => postUserRegister(userData),
        onSuccess: ()=> {
            enqueueSnackbar('Registration completed, now verify your email')
            location.pathname ='/login'
        },
        onError: ()=>{
            enqueueSnackbar('This email is already in use') 
        }
    });
}

export const mutateUserLogin = () => {
    const {login} = useAuth();
    const { enqueueSnackbar } = useSnackbar()
    return useMutation({
        mutationKey: ['login'],
        mutationFn: (userData: loginFormSchema) => postUserLogin(userData),
        onSuccess: (data) => {
            const jwtToken = 'Bearer ' + data.data;
            login(jwtToken);
            location.pathname ='/home'    
        },
        onError: ()=>{
            enqueueSnackbar('Invalid credentials') 
        }
    });
}