import type { IAuctionItem, IPreAuctionItem } from 'AuctionItem';

import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/api/axios';
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
  const getPreRegisterAuctions = async (): Promise<IPreAuctionItem[]> => {
    const response = await httpClient.get(`${API_END_POINT.PRE_AUCTION}`);
    return response.data.items;
  };

  const [bestAuctionsQuery, imminentAuctionsQuery, preRegisterAuctionsQuery] = useSuspenseQueries({
    queries: [
      { queryKey: [queryKeys.BEST_AUCTIONS], queryFn: getBestAuctions },
      {
        queryKey: [queryKeys.IMMINENT_AUCTIONS],
        queryFn: getImminentAuctions,
      },
      {
        queryKey: [queryKeys.PRE_REGISTER_AUCTIONS],
        queryFn: getPreRegisterAuctions,
      },
    ],
  });

  const bestAuctions = bestAuctionsQuery.data;
  const imminentAuctions = imminentAuctionsQuery.data;
  const preRegisterAuctions = preRegisterAuctionsQuery.data;

  return { bestAuctions, imminentAuctions, preRegisterAuctions };
};
