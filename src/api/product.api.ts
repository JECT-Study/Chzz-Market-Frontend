import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/utils/axios';

export const getOngoingProductList = async () => {
  const response = await httpClient.get(API_END_POINT.ONGOING_PRODUCT_LIST);
  return response.data;
};

export const getUpcomingProductList = async () => {
  const response = await httpClient.get(API_END_POINT.UPCOMING_PRODUCT_LIST);
  return response.data;
};
