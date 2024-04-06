import axios from "axios";
import { BASE_URL } from "~/config/constants";
import {
  QueryCache,
  QueryClient,
} from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { AxiosError } from 'axios';

export const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('Auth-token');
  if (authToken) {
    config.headers.Authorization = authToken;
  }
  return config;
});

export const STATUS_CODE = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === STATUS_CODE.UNAUTHORIZED) {
          localStorage.removeItem('Auth-token')
          window.location.reload();
        }
        enqueueSnackbar({ variant: 'error', message: err.message });
      }
    },
  }),
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
    },
  },
});

