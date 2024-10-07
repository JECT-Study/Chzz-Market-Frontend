import type { IAuctionItem, IPreAuctionItem } from 'AuctionItem';

import { httpClient } from '@/api/axios';
import { API_END_POINT } from '@/constants/api';
import { queryKeys } from '@/constants/queryKeys';
import { useSuspenseQueries } from '@tanstack/react-query';

export const useGetHomeAuctions = () => {
  const getBestAuctions = async (): Promise<IAuctionItem[]> => {
    const response = await httpClient.get(`${API_END_POINT.BEST}`);
    return response.data;
  };
  const getImminentAuctions = async (): Promise<IAuctionItem[]> => {
    const response = await httpClient.get(`${API_END_POINT.IMMINENT}`);
    return response.data;
  };
  const getPreAuctions = async (): Promise<IPreAuctionItem[]> => {
    const response = await httpClient.get(`${API_END_POINT.PRE_AUCTION}?sort=most-liked&page=0&size=5`);
    return response.data.items;
  };

  const [bestAuctionsQuery, imminentAuctionsQuery, preAuctionsQuery] = useSuspenseQueries({
    queries: [
      { queryKey: [queryKeys.BEST_AUCTIONS], queryFn: getBestAuctions },
      {
        queryKey: [queryKeys.IMMINENT_AUCTIONS],
        queryFn: getImminentAuctions,
      },
      {
        queryKey: [queryKeys.PRE_AUCTIONS],
        queryFn: getPreAuctions,
      },
    ],
  });

  const bestAuctions = bestAuctionsQuery.data;
  const imminentAuctions = imminentAuctionsQuery.data;
  const preAuctions = preAuctionsQuery.data;

  return { bestAuctions, imminentAuctions, preAuctions };
};
