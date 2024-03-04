
import axios from 'axios';
import { BASE_URL } from './../config/constants';
import { registerFormSchema } from '../View/RegisterView/schema';
import { loginFormSchema } from '../View/LoginView/schema';

const axiosInstance = axios.create({baseURL: BASE_URL});

export const postUserRegister = async (userData: registerFormSchema) => {
    return (await axiosInstance.post('/api/account/register',userData));
};

export const postUserLogin = async (userData: loginFormSchema) => {
    return (await axiosInstance.post('/api/account/login',userData));
};
