import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/index';

export const patchPreAuction = async ({ preAuctionId, formData }: { preAuctionId: number; formData: FormData }) => {
  await httpClient.patch(`${API_END_POINT.PRE_AUCTION}/${preAuctionId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
