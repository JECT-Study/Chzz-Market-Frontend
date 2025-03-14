import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

import type { IUserAuctionHistoryList } from '@/entities/auction/types/list';
import type { GetAuctionProps } from '@/entities/user/user';

export const getMyHistoryAuction = async ({
  pageNumber,
  pageSize
}: GetAuctionProps): Promise<IUserAuctionHistoryList> => {
  const response = await httpClient.get(
    `${API_END_POINT.BID}?status=proceeding&page=${pageNumber}&size=${pageSize}`
  );
  return response.data;
};
