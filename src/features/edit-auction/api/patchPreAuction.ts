import { API_END_POINT, httpClient } from '@/shared';

export const patchPreAuction = async ({ preAuctionId, formData }: { preAuctionId: number; formData: FormData }) => {
  const response = await httpClient.patch(`${API_END_POINT.PRE_AUCTION}/${preAuctionId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
