import { API_END_POINT, httpClient } from '@/shared';

import type { IAuctionList } from '@/entities';

export const getImminentAuctions = async (): Promise<IAuctionList> => {
  const response = await httpClient.get(`${API_END_POINT.IMMINENT}`);

  return response.data;
};
