import { UserProfile } from '@/@types/user';
import { httpClient } from '@/api/axios';
import { API_END_POINT } from '@/constants/api';

export const getProfile = async () => {
  const response = await httpClient.get(`${API_END_POINT.PROFILE}`);
  return response.data;
};

export const postEditProfile = async (data: UserProfile) => {
  const response = await httpClient.post(`${API_END_POINT.PROFILE}/profile`,data);
  return response.data;
};
