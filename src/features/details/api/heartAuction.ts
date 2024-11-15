import { API_END_POINT, httpClient } from '@/shared';

export const heartAuction = async (preAuctionId: number): Promise<{ isLiked: boolean; likeCount: number }> => {
  const response = await httpClient.post(`${API_END_POINT.PRE_AUCTION}/${preAuctionId}/likes`);

  return response.data;
};
