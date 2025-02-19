import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';
import type { IBidderList } from '../config';

export const getBidderList = async (
  auctionId: number
): Promise<IBidderList> => {
  const response = await httpClient.get(
    `${API_END_POINT.AUCTION}/${auctionId}/bids`
  );

  return response.data;
};
