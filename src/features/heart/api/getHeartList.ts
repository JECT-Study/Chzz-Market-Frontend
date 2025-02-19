import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

import type { IPreAuctionList } from '@/entities';

export const getHeartList = async (): Promise<IPreAuctionList> => {
  const response = await httpClient.get(`${API_END_POINT.HEART_LIST}`);

  return response.data;
};
