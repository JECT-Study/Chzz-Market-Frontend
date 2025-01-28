import { API_END_POINT, httpClient } from '@/shared';

export const getAuctionDetails = async <U>(auctionId: number): Promise<U> => {
  const response = await httpClient.get(
    `${API_END_POINT.AUCTION}/${auctionId}`
  );

  return response.data;
};
