import { API_END_POINT, httpClient } from '@/shared';

export const patchPreAuction = async ({ preAuctionId, formData }: { preAuctionId: number; formData: FormData }) => {
  const response = await httpClient.patch(`${API_END_POINT.AUCTION}/${preAuctionId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
