import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

export const postOrderId = async () => {
  const response = await httpClient.post(API_END_POINT.CREATE_ORDERID);
  return response.data;
};
