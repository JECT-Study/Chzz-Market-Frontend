import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import type { IBidPostData } from '../config/type';

export const postBid = async (bidData: IBidPostData) => {
  await httpClient.post(API_END_POINT.BID, bidData);
  return;
};
