import { API_END_POINT, httpClient } from '@/shared';

export const deletePreAuction = async (preAuctionId: number) => {
  await httpClient.delete(`${API_END_POINT.AUCTION}/${preAuctionId}`);
  return;
};
