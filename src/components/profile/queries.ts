import { httpClient } from '@/api/axios';
import { API_END_POINT } from '@/constants/api';

export const getProfile = async () => {
  const response = await httpClient.get(`${API_END_POINT.PROFILE}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  return response.data;
};

export const postEditProfile = async () => {
  const response = await httpClient.post(API_END_POINT.PROFILE);
};
