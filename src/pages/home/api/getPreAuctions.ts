import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

import type { IPreAuctionList } from '@/entities';

export const getPreAuctions = async (): Promise<IPreAuctionList> => {
  const response = await httpClient.get(`${API_END_POINT.PRE_AUCTION}`);

  return response.data;
};
