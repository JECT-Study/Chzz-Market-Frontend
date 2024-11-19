import { API_END_POINT, httpClient } from '@/shared';

import { GetAuctionProps } from '@/entities/user/user';
import type { IAuctionEndRegisteredList } from '@/entities';

export const getAuctionEndRegister = async ({ pageNumber, pageSize, sortType = 'newest' }: GetAuctionProps): Promise<IAuctionEndRegisteredList> => {
  const response = await httpClient.get(`${API_END_POINT.USER_END_AUCTION_REGISTERED}?sort=${sortType}&page=${pageNumber}&size=${pageSize}`);
  return response.data;
};
