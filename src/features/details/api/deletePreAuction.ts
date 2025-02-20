import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

export const deletePreAuction = async (preAuctionId: number) => {
  await httpClient.delete(`${API_END_POINT.AUCTION}/${preAuctionId}`);
  return;
};
