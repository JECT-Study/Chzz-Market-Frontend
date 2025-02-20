import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

import type { IAuctionOngoingRegisteredList } from '@/entities/auction';
import type { GetAuctionProps } from '@/entities/user/user';

export const getAuctionOngoingRegister = async ({
  pageNumber,
  pageSize,
  sortType = 'newest'
}: GetAuctionProps): Promise<IAuctionOngoingRegisteredList> => {
  const response = await httpClient.get(
    `${API_END_POINT.USER_ONGOING_AUCTION_REGISTERED}?sort=${sortType}&page=${pageNumber}&size=${pageSize}`
  );

  return response.data;
};
