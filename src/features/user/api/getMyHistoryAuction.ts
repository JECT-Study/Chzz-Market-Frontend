import { API_END_POINT, httpClient } from '@/shared';

import { GetAuctionProps } from '@/entities/user/user';
import type { IUserAuctionHistoryList } from '@/entities';

export const getMyHistoryAuction = async ({ pageNumber, pageSize }: GetAuctionProps): Promise<IUserAuctionHistoryList> => {
  const response = await httpClient.get(`${API_END_POINT.BID}?status=proceeding&page=${pageNumber}&size=${pageSize}`);
  return response.data;
};
