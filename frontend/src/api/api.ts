import axios from 'axios';
import { BASE_URL } from '~/config/constants';
import { QueryCache, QueryClient } from '@tanstack/react-query';
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
  ERR_NETWORK: 'ERR_NETWORK',
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onSuccess: () => {
      // Catch wrong path and replace when connection is established
      if (location.pathname === '/connection')
        // Changing direct location pathname due to invalid hook calls
        location.pathname = '/home';
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === STATUS_CODE.UNAUTHORIZED) {
          // Manually logout instead of useAuth due to invalid hook calls
          localStorage.removeItem('Auth-token');
          queryClient.removeQueries();
          location.reload();
        }
        // Checking for generic network error code to catch and display view
        if (err.code === STATUS_CODE.ERR_NETWORK) {
          queryClient.cancelQueries();
          location.pathname = '/connection';
          return;
        }

        enqueueSnackbar({ variant: 'error', message: err.code });
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
