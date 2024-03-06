import axios from 'axios';
import { BASE_URL } from '~/config/constants';
import { registerFormSchema } from '~/View/RegisterView/schema';
import { loginFormSchema } from '~/View/LoginView/schema';
import {
  forgotPasswordModel,
  resetPasswordModel,
} from '~/View/RegisterView/PasswordRenew/schema';

const axiosInstance = axios.create({ baseURL: BASE_URL });

export const postUserRegister = async (userData: registerFormSchema) => {
  return await axiosInstance.post('/api/account/register', userData);
};

export const postUserLogin = async (userData: loginFormSchema) => {
  return await axiosInstance.post('/api/account/login', userData);
};

export const postForgotPassword = async (userData: forgotPasswordModel) => {
  return await axiosInstance.post('/api/account/forgotPassword', userData);
};

export const postResetPassword = async (userData: resetPasswordModel) => {
  return await axiosInstance.post('/api/account/resetPassword', userData);
};
