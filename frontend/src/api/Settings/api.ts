import axios from 'axios';
import { BASE_URL } from '~/config/constants';

export interface Settings {
  theme: string;
  color: string;
}

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('Auth-token');
  if (authToken) {
    config.headers.Authorization = authToken;
  }
  return config;
});

export const querySettings = async () => {
  const response = await axiosInstance.get('/api/settings/getSettings');
  return response.data as Settings;
};

export const editSettings = async (preferences: Settings) => {
  return await axiosInstance.patch(`/api/settings/updateSettings`, preferences);
};
