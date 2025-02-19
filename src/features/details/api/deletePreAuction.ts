import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

export const deletePreAuction = async (preAuctionId: number) => {
  await httpClient.delete(`${API_END_POINT.AUCTION}/${preAuctionId}`);
  return;
};
