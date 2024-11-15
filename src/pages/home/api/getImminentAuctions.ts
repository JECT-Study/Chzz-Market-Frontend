import { API_END_POINT, EmptyError, httpClient } from '@/shared';

import type { IAuctionItem } from '@/entities';

export const getImminentAuctions = async (): Promise<IAuctionItem[]> => {
  const response = await httpClient.get(`${API_END_POINT.IMMINENT}`);
  if (response.data.length === 0) {
    throw new EmptyError('imminent');
  }

  return response.data;
};
