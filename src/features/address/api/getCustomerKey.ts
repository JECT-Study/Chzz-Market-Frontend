import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

export const getCustomerKey = async () => {
  const response = await httpClient.get(API_END_POINT.CUSTOMER_KEY);
  return response.data;
};
