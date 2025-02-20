import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

import type { IPreAuctionList } from '@/entities/auction';

export const getPreAuctions = async (): Promise<IPreAuctionList> => {
  const response = await httpClient.get(`${API_END_POINT.PRE_AUCTION}`);

  return response.data;
};
