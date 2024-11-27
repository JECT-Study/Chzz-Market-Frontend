import { API_END_POINT, httpClient } from '@/shared';

import type { GetAuctionProps } from '@/entities/user/user';
import type { IUserAuctionLostList } from '@/entities';

export const getMyLostAuction = async ({ pageNumber, pageSize }: GetAuctionProps): Promise<IUserAuctionLostList> => {
  const response = await httpClient.get(`${API_END_POINT.AUCTION}/users/lost?page=${pageNumber}&size=${pageSize}`);
  return response.data;
};
