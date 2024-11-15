import { API_END_POINT, httpClient } from '@/shared';

import type { IAuctionList } from '@/entities';
import type { ProductParams } from '../config';

export const getOngoingProductList = async ({ pageNumber, pageSize, sortType = 'newest', category = 'all' }: ProductParams): Promise<IAuctionList> => {
  const response = await httpClient.get(`${API_END_POINT.AUCTION}?category=${category}&sort=${sortType}&page=${pageNumber}&size=${pageSize}`);
  return response.data;
};
