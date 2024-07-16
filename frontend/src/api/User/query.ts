import { useMutation, useQuery } from '@tanstack/react-query';
import {
  postDeleteAccount,
  postForgotPassword,
  postResetPassword,
  postUserLogin,
  postUserRegister,
  queryMyAccount,
  updateUser,
} from './api';
import { registerFormSchema } from '~/View/RegisterView/schema';
import { loginFormSchema } from '~/View/LoginView/schema';
import { useSnackbar } from 'notistack';
import {
  forgotPasswordModel,
  resetPasswordModel,
} from '~/View/RegisterView/PasswordRenew/schema';
import { useAuth } from '~/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { STATUS_CODE } from '../api';
import { AxiosError } from 'axios';
import { t } from '@lingui/macro';
import { userModel } from '~/component/UserBox/schema';

export const mutateUserRegister = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (userData: registerFormSchema) => postUserRegister(userData),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Registration completed, now verify your email'}));
      navigate('/login', { replace: true });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === STATUS_CODE.INTERNAL_SERVER_ERROR) {
          enqueueSnackbar({
            variant: 'error',
            message: t({message:'Email or username already in use'}),
          });
        }
      }
    },
  });
};

export const mutateUserLogin = () => {
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (userData: loginFormSchema) => postUserLogin(userData),
    onSuccess: (data) => {
      const jwtToken = data.accessToken;
      const refreshToken = data.refreshToken
      login(jwtToken,refreshToken);
      navigate('/home', { replace: true });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === STATUS_CODE.INTERNAL_SERVER_ERROR) {
          enqueueSnackbar({ variant: 'error', message: t({message:'Invalid credentials'}) });
        }
      }
    },
  });
};

export const mutateForgotPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['forgotPassword'],
    mutationFn: (userData: forgotPasswordModel) => postForgotPassword(userData),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Reset token sent to email'}));
    },
  });
};

export const mutateResetPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: (userData: resetPasswordModel) => postResetPassword(userData),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Password renewed'}));
    },
  });
};

export const mutateDeleteAccount = () => {
  const { logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['deleteAccout'],
    mutationFn: () => postDeleteAccount(),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Account deleted'}));
      logout();
    },
  });
};

export const getMyAccount = () => {
  return useQuery({
    queryKey: ['getMyAccount'],
    queryFn: () => queryMyAccount(),
  });
};

export const mutateUpdateAccount = () => {
  const { logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationKey: ['updateAccount'],
    mutationFn: (userData: userModel) => updateUser(userData),
    onSuccess: () => {
      enqueueSnackbar(t({message:'Account updated'}));
      logout();
    },
    onError: ()=>{
      enqueueSnackbar(t({message:'Invalid old password'}));
    }
  });
};