import { API_END_POINT, httpClient } from '@/shared';
import type { IBidPostData } from '../config';

export const postBid = async (bidData: IBidPostData) => {
  await httpClient.post(API_END_POINT.BID, bidData);
  return;
};
