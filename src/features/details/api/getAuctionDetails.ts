import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

export const getAuctionDetails = async <U>(auctionId: number): Promise<U> => {
  const response = await httpClient.get(
    `${API_END_POINT.AUCTION}/${auctionId}`
  );

  return response.data;
};
