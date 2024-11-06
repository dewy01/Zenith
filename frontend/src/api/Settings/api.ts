import { axiosInstance } from '../api';

export interface Settings {
  theme: string;
  color: string;
  language: string;
  reminder: number;
  routes: { [routeName: string]: boolean };
  colors: { [color: string]: string };
}

export const querySettings = async () => {
  const response = await axiosInstance.get('/api/settings/getSettings');
  return response.data as Settings;
};

export const editSettings = async (preferences: Settings) => {
  return await axiosInstance.patch(`/api/settings/updateSettings`, preferences);
};
