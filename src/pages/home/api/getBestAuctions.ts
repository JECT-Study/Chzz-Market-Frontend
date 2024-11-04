import type { IAuctionItem } from '@/@types/AuctionItem';
import { API_END_POINT, EmptyError, httpClient } from '@/shared';

export const getBestAuctions = async (): Promise<IAuctionItem[]> => {
  const response = await httpClient.get(`${API_END_POINT.BEST}`);
  if (response.data.length === 0) {
    throw new EmptyError('best');
  }

  return response.data;
};
