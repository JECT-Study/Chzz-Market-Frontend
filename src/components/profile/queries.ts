import { httpClient } from '@/api/axios';
import { API_END_POINT } from '@/constants/api';

export const getProfile = async () => {
  const response = await httpClient.get(`${API_END_POINT.SIGNUP}`);
  return response.data;
};

export const postEditProfile = async (formData: FormData) => {
  const response = await httpClient.post(`${API_END_POINT.PROFILE}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};
