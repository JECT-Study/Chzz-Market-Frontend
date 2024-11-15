import { API_END_POINT, EmptyError, httpClient } from '@/shared';

import type { IPreAuctionItem } from '@/entities';

export const getPreAuctionHeartList = async (): Promise<IPreAuctionItem[]> => {
  const response = await httpClient.get(`${API_END_POINT.PRE_AUCTION}/history`);
  if (response.data.items.length === 0) {
    throw new EmptyError('heart');
  }

  return response.data.items;
};
