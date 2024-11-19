import { API_END_POINT, httpClient } from '@/shared';

export const convertAuction = async (preAuctionId: number) => {
  const response = await httpClient.post(`${API_END_POINT.AUCTION}/start`, preAuctionId);

  return response.data;
};