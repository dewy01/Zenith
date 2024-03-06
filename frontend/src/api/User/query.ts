import { useMutation } from '@tanstack/react-query';
import {
  postForgotPassword,
  postResetPassword,
  postUserLogin,
  postUserRegister,
} from './api';
import { registerFormSchema } from '~/View/RegisterView/schema';
import { loginFormSchema } from '~/View/LoginView/schema';
import { useSnackbar } from 'notistack';
import {
  forgotPasswordModel,
  resetPasswordModel,
} from '~/View/RegisterView/PasswordRenew/schema';
import { useAuth } from '~/context/AuthContext';

export const mutateUserRegister = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (userData: registerFormSchema) => postUserRegister(userData),
    onSuccess: () => {
      enqueueSnackbar('Registration completed, now verify your email');
      location.pathname = '/login';
    },
    onError: () => {
      enqueueSnackbar('This email is already in use');
    },
  });
};

export const mutateUserLogin = () => {
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (userData: loginFormSchema) => postUserLogin(userData),
    onSuccess: (data) => {
      const jwtToken = 'Bearer ' + data.data;
      login(jwtToken);
      location.pathname = '/home';
    },
    onError: () => {
      enqueueSnackbar('Invalid credentials');
    },
  });
};

export const mutateForgotPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['forgotPassword'],
    mutationFn: (userData: forgotPasswordModel) => postForgotPassword(userData),
    onSuccess: () => {
      enqueueSnackbar('Reset token sent to email');
    },
    onError: () => {
      enqueueSnackbar('Server error');
    },
  });
};

export const mutateResetPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: (userData: resetPasswordModel) => postResetPassword(userData),
    onSuccess: () => {
      enqueueSnackbar('Password renewed');
    },
    onError: () => {
      enqueueSnackbar('Server error');
    },
  });
};
