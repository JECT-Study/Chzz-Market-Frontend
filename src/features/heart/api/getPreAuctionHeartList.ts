import { API_END_POINT, httpClient } from '@/shared';

import type { IPreAuctionList } from '@/entities';

export const getPreAuctionHeartList = async (): Promise<IPreAuctionList> => {
  const response = await httpClient.get(`${API_END_POINT.HEARTS}`);

  return response.data;
};
