import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

import type { IUserAuctionLostList } from '@/entities/auction/types/list';
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
