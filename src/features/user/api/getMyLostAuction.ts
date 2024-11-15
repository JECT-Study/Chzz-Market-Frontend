import { API_END_POINT, httpClient } from '@/shared';

import { GetAuctionProps } from '@/@types/user';
import type { IUserAuctionLostList } from '@/entities';

export const getMyLostAuction = async ({ pageNumber, pageSize }: GetAuctionProps): Promise<IUserAuctionLostList> => {
  const response = await httpClient.get(`${API_END_POINT.AUCTION}/lost?page=${pageNumber}&size=${pageSize}`);
  return response.data;
};
