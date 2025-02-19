import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

export const deleteUsers = async () => {
  const response = await httpClient.delete(API_END_POINT.SIGNUP);

  return response.data;
};
