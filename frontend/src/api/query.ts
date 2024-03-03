import { useMutation } from "@tanstack/react-query"
import { postUserLogin, postUserRegister } from "./api";
import { registerFormSchema } from "../View/RegisterView/schema";
import { loginFormSchema } from "../View/LoginView/schema";
import { useAuth } from "../context/AuthContext";


export const mutateUserRegister = () => {
    return useMutation({
        mutationKey: ['register'],
        mutationFn: (userData: registerFormSchema) => postUserRegister(userData)
    });
}

export const mutateUserLogin = () => {
    const {login} = useAuth();
    return useMutation({
        mutationKey: ['login'],
        mutationFn: (userData: loginFormSchema) => postUserLogin(userData),
        onSuccess: (data) => {
            const jwtToken = 'Bearer ' + data.data;
            login(jwtToken);
            location.pathname ='/home'    
        }
    });
}