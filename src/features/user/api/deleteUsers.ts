import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

export const deleteUsers = async () => {
  const response = await httpClient.delete(API_END_POINT.SIGNUP);

  return response.data;
};
