import { API_END_POINT, EmptyError, httpClient } from '@/shared';

import type { IPreAuctionItem } from '@/entities';

export const getPreAuctions = async (): Promise<IPreAuctionItem[]> => {
  const response = await httpClient.get(`${API_END_POINT.PRE_AUCTION}?sort=most-liked,product-newest&page=0&size=5`);
  if (response.data.items.length === 0) {
    throw new EmptyError('preAuction');
  }

  return response.data.items;
};
