import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

export const getAddress = async () => {
  const response = await httpClient.get(`${API_END_POINT.ADDRESS}?size=1`);
  return response.data;
};
