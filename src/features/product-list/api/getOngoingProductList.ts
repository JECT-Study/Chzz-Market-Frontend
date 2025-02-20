import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

import type { IAuctionList } from '@/entities/auction';
import type { ProductParams } from '../config';

export const getOngoingProductList = async ({
  pageNumber,
  pageSize,
  sortType = 'newest',
  category = 'all'
}: ProductParams): Promise<IAuctionList> => {
  const response = await httpClient.get(
    `${API_END_POINT.AUCTION}?category=${category}&sort=${sortType}&page=${pageNumber}&size=${pageSize}`
  );
  return response.data;
};
