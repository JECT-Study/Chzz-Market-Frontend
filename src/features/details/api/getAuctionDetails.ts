import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

export const getAuctionDetails = async <U>(auctionId: number): Promise<U> => {
  const response = await httpClient.get(
    `${API_END_POINT.AUCTION}/${auctionId}`
  );

  return response.data;
};
