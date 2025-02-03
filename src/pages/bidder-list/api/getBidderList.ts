import { API_END_POINT, httpClient } from '@/shared';
import type { IBidderList } from '../config';

export const getBidderList = async (
  auctionId: number
): Promise<IBidderList> => {
  const response = await httpClient.get(
    `${API_END_POINT.AUCTION}/${auctionId}/bids`
  );

  return response.data;
};
