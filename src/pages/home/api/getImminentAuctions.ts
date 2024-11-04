import type { IAuctionItem } from '@/@types/AuctionItem';
import { API_END_POINT, EmptyError, httpClient } from '@/shared';

export const getImminentAuctions = async (): Promise<IAuctionItem[]> => {
  const response = await httpClient.get(`${API_END_POINT.IMMINENT}`);
  if (response.data.length === 0) {
    throw new EmptyError('imminent');
  }

  return response.data;
};
