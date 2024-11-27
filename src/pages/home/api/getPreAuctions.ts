import { API_END_POINT, httpClient } from '@/shared';

import type { IPreAuctionList } from '@/entities';

export const getPreAuctions = async (): Promise<IPreAuctionList> => {
  const response = await httpClient.get(`${API_END_POINT.PRE_AUCTION}`);

  return response.data;
};
