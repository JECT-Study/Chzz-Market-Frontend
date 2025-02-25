import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

import type { IAuctionList } from '@/entities/auction/types/list';

export const getBestAuctions = async (): Promise<IAuctionList> => {
  const response = await httpClient.get(`${API_END_POINT.BEST}`);

  return response.data;
};
