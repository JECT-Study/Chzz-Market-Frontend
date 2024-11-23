import { API_END_POINT, httpClient } from '@/shared';

import type { IPreAuctionItem } from '@/entities';

export const getPreAuctionHeartList = async (): Promise<IPreAuctionItem[]> => {
  const response = await httpClient.get(`${API_END_POINT.PRE_AUCTION}/history`);

  return response.data.items;
};
