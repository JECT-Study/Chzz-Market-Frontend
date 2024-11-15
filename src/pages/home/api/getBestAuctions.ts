import { API_END_POINT, EmptyError, httpClient } from '@/shared';

import type { IAuctionItem } from '@/entities';

export const getBestAuctions = async (): Promise<IAuctionItem[]> => {
  const response = await httpClient.get(`${API_END_POINT.BEST}`);
  if (response.data.length === 0) {
    throw new EmptyError('best');
  }

  return response.data;
};
