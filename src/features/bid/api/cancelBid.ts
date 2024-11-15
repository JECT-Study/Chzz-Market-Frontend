import { API_END_POINT, httpClient } from '@/shared';

export const cancelBid = async (bidId: number) => {
  await httpClient.patch(`${API_END_POINT.BID}/${bidId}/cancel`);
  return;
};
