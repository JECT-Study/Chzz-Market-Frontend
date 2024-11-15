import { API_END_POINT, httpClient } from '@/shared';

import type { IAuctionDetails } from '@/entities';

export const getAuctionDetails = async (auctionId: number): Promise<IAuctionDetails> => {
  const response = await httpClient.get(`${API_END_POINT.AUCTION}/${auctionId}`);

  return response.data;
};
