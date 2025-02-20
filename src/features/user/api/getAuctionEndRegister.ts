import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

import type { IAuctionEndRegisteredList } from '@/entities/auction';
import type { GetAuctionProps } from '@/entities/user/user';

export const getAuctionEndRegister = async ({
  pageNumber,
  pageSize,
  sortType = 'newest'
}: GetAuctionProps): Promise<IAuctionEndRegisteredList> => {
  const response = await httpClient.get(
    `${API_END_POINT.USER_END_AUCTION_REGISTERED}?sort=${sortType}&page=${pageNumber}&size=${pageSize}`
  );
  return response.data;
};
