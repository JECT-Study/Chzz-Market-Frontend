import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

export const getAddresses = async () => {
  const response = await httpClient.get(API_END_POINT.ADDRESS);
  return response.data;
};
