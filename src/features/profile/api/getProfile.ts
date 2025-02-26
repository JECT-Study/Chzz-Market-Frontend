import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

export const getProfile = async () => {
  const response = await httpClient.get(`${API_END_POINT.SIGNUP}`);
  return response.data;
};
