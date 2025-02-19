import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

export const convertAuction = async (preAuctionId: number) => {
  const response = await httpClient.post(
    `${API_END_POINT.AUCTION}/${preAuctionId}/start`
  );

  return response.data;
};
