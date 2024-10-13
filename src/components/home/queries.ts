import type { IAuctionItem, IPreAuctionItem } from 'AuctionItem';

import { httpClient } from '@/api/axios';
import { API_END_POINT } from '@/constants/api';
import { queryKeys } from '@/constants/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetBestAuctions = () => {
  const getBestAuctions = async (): Promise<IAuctionItem[]> => {
    const response = await httpClient.get(`${API_END_POINT.BEST}`);
    return response.data;
  };

  const { data: bestAuctions } = useSuspenseQuery({ queryKey: [queryKeys.BEST_AUCTIONS], queryFn: getBestAuctions });

  return { bestAuctions };
};
export const useGetImminentAuctions = () => {
  const getImminentAuctions = async (): Promise<IAuctionItem[]> => {
    const response = await httpClient.get(`${API_END_POINT.IMMINENT}`);
    return response.data;
  };

  const { data: imminentAuctions } = useSuspenseQuery({
    queryKey: [queryKeys.IMMINENT_AUCTIONS],
    queryFn: getImminentAuctions,
  });

  return { imminentAuctions };
};
export const useGetPreAuctions = () => {
  const getPreAuctions = async (): Promise<IPreAuctionItem[]> => {
    const response = await httpClient.get(`${API_END_POINT.PRE_AUCTION}?sort=most-liked&page=0&size=5`);
    if (!response.data || !response.data.items) {
      throw new Error('No items found in the response');
    }

    return response.data.items;
  };

  const { data: preAuctions } = useSuspenseQuery({
    queryKey: [queryKeys.PRE_AUCTIONS],
    queryFn: getPreAuctions,
  });

  return { preAuctions };
};
