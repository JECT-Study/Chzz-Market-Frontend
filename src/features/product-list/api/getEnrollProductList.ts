import { API_END_POINT, httpClient } from '@/shared';

import type { IPreAuctionList } from '@/entities';
import type { ProductParams } from '../config';

export const getEnrollProductList = async ({
  pageNumber,
  pageSize,
  category = 'all'
}: ProductParams): Promise<IPreAuctionList> => {
  const response = await httpClient.get(
    `${API_END_POINT.AUCTION}?status=pre&category=${category}&page=${pageNumber}&size=${pageSize}`
  );
  return response.data;
};
