import { API_END_POINT, httpClient } from '@/shared';

export const deletePreAuctionHeart = async (preAuctionId: number) => {
  await httpClient.post(`${API_END_POINT.PRE_AUCTION}/${preAuctionId}/likes`);

  return;
};
