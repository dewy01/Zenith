import { axiosInstance } from '../api';

export const postImage = async (data: FormData) => {
  return await axiosInstance.post('/api/images', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};