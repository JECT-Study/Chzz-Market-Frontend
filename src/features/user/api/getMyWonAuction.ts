import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

import type { IUserAuctionLostList } from '@/entities';
import type { GetAuctionProps } from '@/entities/user/user';

export const getMyWonAuction = async ({
  pageNumber,
  pageSize
}: GetAuctionProps): Promise<IUserAuctionLostList> => {
  const response = await httpClient.get(
    `${API_END_POINT.AUCTION}/users/won?page=${pageNumber}&size=${pageSize}`
  );
  return response.data;
};
