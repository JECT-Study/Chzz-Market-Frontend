import type { IRegisterPatch } from '@/features/register';
import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

export const patchPreAuction = async ({
  preAuctionId,
  submitData
}: {
  preAuctionId: number;
  submitData: IRegisterPatch;
}) => {
  const response = await httpClient.patch(
    `${API_END_POINT.AUCTION}/${preAuctionId}`,
    submitData
  );

  return response.data;
};
