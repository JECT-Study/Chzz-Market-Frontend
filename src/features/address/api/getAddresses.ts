import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

export const getAddresses = async () => {
  const response = await httpClient.get(API_END_POINT.ADDRESS);
  return response.data;
};
