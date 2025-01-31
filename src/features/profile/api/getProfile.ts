import { API_END_POINT, httpClient } from '@/shared';

export const getProfile = async () => {
  const response = await httpClient.get(`${API_END_POINT.SIGNUP}`);
  return response.data;
};
