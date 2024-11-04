import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';
import { AUTH_TOKEN, BASE_URL, REFRESH_TOKEN } from '~/config/constants';
import { AccessToken, axiosInstance as noAuthInstance } from './User/api';

export const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
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
  mutationCache: new MutationCache({
    onSuccess: () => {
      handleSuccessCache()
    },
    onError: async (err) => {
      await handleErrorCache(err)
    },
  }),
  queryCache: new QueryCache({
    onSuccess: () => {
      handleSuccessCache()
    },
    onError: async (err) => {
      await handleErrorCache(err)
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

const handleErrorCache= async (err:Error) => {
  if (err instanceof AxiosError) {
    // Refresh tokens when unauthorized
    if (err.response?.status === STATUS_CODE.UNAUTHORIZED) {
      try {
        await refreshAccessToken()
      } catch (error) {
        // If unable to refresh, logout user
        localStorage.removeItem(AUTH_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        queryClient.removeQueries();
        location.reload();
      }
    } else if (err.code === STATUS_CODE.ERR_NETWORK) {
      queryClient.cancelQueries();
      location.pathname = '/connection';
      return;
    } else {
      enqueueSnackbar({ variant: 'error', message: err.code });
    }
  }
}

const handleSuccessCache = ()=>{
  // Catch wrong path and replace when connection is established
  if (location.pathname === '/connection') {
    location.pathname = '/home';
  }
}

export const refreshAccessToken = async () => {
  const refToken = localStorage.getItem(REFRESH_TOKEN);
  const authToken = localStorage.getItem(AUTH_TOKEN);

  try {
    const response = await noAuthInstance.post('/api/token/refresh', {  accessToken: authToken,refreshToken: refToken } as AccessToken);
    const { accessToken, refreshToken } = response.data as AccessToken;

    localStorage.setItem(AUTH_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    return;
  } catch (error) {
    throw new Error('Failed to refresh access token');
  }
};
