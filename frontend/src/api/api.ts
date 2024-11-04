import { t } from '@lingui/macro';
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

const ERROR_MESSAGE_MAP = {
  [STATUS_CODE.UNAUTHORIZED]: t`Your session has expired. Please log in again.`,
  [STATUS_CODE.BAD_REQUEST]: t`There seems to be an issue with your request. Please check and try again.`,
  [STATUS_CODE.NOT_FOUND]: t`The requested resource could not be found.`,
  [STATUS_CODE.CONFLICT]: t`A conflict occurred with your request. Please try again.`,
  [STATUS_CODE.INTERNAL_SERVER_ERROR]: t`The server encountered an error. Please try again later.`,
  [STATUS_CODE.ERR_NETWORK]: t`Network error. Please check your connection and try again.`,
  default: t`An unexpected error occurred. Please try again later.`
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

const handleErrorCache = async (err: Error) => {
  let message = ERROR_MESSAGE_MAP.default; 

  if (err instanceof AxiosError) {
    const statusCode = err.response?.status;

    if (statusCode) {
      message = ERROR_MESSAGE_MAP[statusCode] || ERROR_MESSAGE_MAP.default;
    }

    if (err.code === STATUS_CODE.ERR_NETWORK) {
      message = ERROR_MESSAGE_MAP[STATUS_CODE.ERR_NETWORK];
      queryClient.cancelQueries();
      location.pathname = '/connection';
      return;
    }

    if (statusCode === STATUS_CODE.UNAUTHORIZED) {
      try {
        await refreshAccessToken();

        // try to re-execute
        if (err.config) {
          if (err.config.method) {
            return await axiosInstance(err.config);
          }
        }
        
        return; 
      } catch (error) {
        localStorage.removeItem(AUTH_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        queryClient.removeQueries();
        location.reload();
      }
    }
  }

  enqueueSnackbar(message, { variant: 'error' });
};


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
