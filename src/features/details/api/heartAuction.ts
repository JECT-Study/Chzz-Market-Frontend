import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

export const heartAuction = async (
  preAuctionId: number
): Promise<{ isLiked: boolean; likeCount: number }> => {
  const response = await httpClient.post(
    `${API_END_POINT.AUCTION}/${preAuctionId}/likes`
  );

  return response.data;
};
