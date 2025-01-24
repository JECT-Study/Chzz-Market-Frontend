import { API_END_POINT, httpClient } from '@/shared';

import type { IPreAuctionList } from '@/entities';

export const getHeartList = async (): Promise<IPreAuctionList> => {
  const response = await httpClient.get(`${API_END_POINT.HEART_LIST}`);

  return response.data;
};
