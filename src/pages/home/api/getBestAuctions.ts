import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

import type { IAuctionList } from '@/entities';

export const getBestAuctions = async (): Promise<IAuctionList> => {
  const response = await httpClient.get(`${API_END_POINT.BEST}`);

  return response.data;
};
