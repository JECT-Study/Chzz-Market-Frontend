import { API_END_POINT, httpClient } from '@/shared';

import { GetAuctionProps } from '@/@types/user';
import type { IUserAuctionLostList } from '@/entities';

export const getMyWonAuction = async ({ pageNumber, pageSize }: GetAuctionProps): Promise<IUserAuctionLostList> => {
  const response = await httpClient.get(`${API_END_POINT.AUCTION}/won?page=${pageNumber}&size=${pageSize}`);
  return response.data;
};
