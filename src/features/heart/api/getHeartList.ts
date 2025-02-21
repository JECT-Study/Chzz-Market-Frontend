import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

import type { IPreAuctionList } from '@/entities/auction/types/list';

export const getHeartList = async (): Promise<IPreAuctionList> => {
  const response = await httpClient.get(`${API_END_POINT.HEART_LIST}`);

  return response.data;
};
