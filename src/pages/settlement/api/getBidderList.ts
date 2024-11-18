import { API_END_POINT, httpClient } from '@/shared';
import { IBidder } from '../config';

export const getBidderList = async (auctionId: number): Promise<IBidder[]> => {
  const response = await httpClient.get(`${API_END_POINT.AUCTION}/${auctionId}/bids?sort=bid-amount,desc`);

  return response.data.items;
};
