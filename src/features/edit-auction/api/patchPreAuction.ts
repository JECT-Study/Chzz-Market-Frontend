import type { IRegisterPatch } from '@/features/register';
import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

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
