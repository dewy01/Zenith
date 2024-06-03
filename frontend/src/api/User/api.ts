import axios from 'axios';
import { BASE_URL } from '~/config/constants';
import { registerFormSchema } from '~/View/RegisterView/schema';
import { loginFormSchema } from '~/View/LoginView/schema';
import { userModel } from '~/component/UserBox/schema';
import { axiosInstance as authInstance }from '../api'
import {
  forgotPasswordModel,
  resetPasswordModel,
} from '~/View/RegisterView/PasswordRenew/schema';
import { axiosInstance as loggedInstance } from '../api';

export interface MyAccount {
  username: string;
  email: string;
  groupName: string;
}

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

export const postDeleteAccount = async () => {
  return await loggedInstance.delete('/api/account/deleteAccount');
};

export const queryMyAccount = async () => {
  const response = await loggedInstance.get('/api/account/getMyAccount');
  return response.data as MyAccount;
};

export const updateUser = async (userData: userModel) => {
  return await authInstance.patch('/api/account/updateAccount', userData);
};