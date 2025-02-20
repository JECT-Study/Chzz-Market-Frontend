import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

export const getCustomerKey = async () => {
  const response = await httpClient.get(API_END_POINT.CUSTOMER_KEY);
  return response.data;
};
