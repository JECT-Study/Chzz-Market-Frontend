import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

import type { IPreAuctionRegisteredList } from '@/entities';
import type { GetAuctionProps } from '@/entities/user/user';

export const getAuctionPreAuctionRegister = async ({
  pageNumber,
  pageSize,
  sortType = 'product-newest'
}: GetAuctionProps): Promise<IPreAuctionRegisteredList> => {
  const response = await httpClient.get(
    `${API_END_POINT.USER_PRE_AUCTION_REGISTERED}?sort=${sortType}&page=${pageNumber}&size=${pageSize}`
  );
  return response.data;
};
