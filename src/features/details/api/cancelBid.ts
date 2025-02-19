import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

export const cancelBid = async (bidId: number) => {
  await httpClient.patch(`${API_END_POINT.BID}/${bidId}/cancel`);
  return;
};
