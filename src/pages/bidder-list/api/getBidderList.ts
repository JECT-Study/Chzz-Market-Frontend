import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import type { IBidderList } from '../config/type';
import { httpClient } from '@/shared/api/axios';

export const getBidderList = async (
  auctionId: number
): Promise<IBidderList> => {
  const response = await httpClient.get(
    `${API_END_POINT.AUCTION}/${auctionId}/bids`
  );

  return response.data;
};
