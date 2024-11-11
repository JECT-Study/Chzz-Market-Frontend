import { API_END_POINT, httpClient } from '@/shared';

import type { IPreAuctionDetails } from '@/entities';

export const getPreAuctionDetails = async (preAuctionId: number | undefined): Promise<IPreAuctionDetails> => {
  const response = await httpClient.get(`${API_END_POINT.PRE_AUCTION}/${preAuctionId}`);

  return response.data;
};
