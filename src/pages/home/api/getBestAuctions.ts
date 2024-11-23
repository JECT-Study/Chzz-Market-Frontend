import { API_END_POINT, httpClient } from '@/shared';

import type { IAuctionItem } from '@/entities';

export const getBestAuctions = async (): Promise<IAuctionItem[]> => {
  const response = await httpClient.get(`${API_END_POINT.BEST}`);

  return response.data;
};
