import type { IAuctionItem, IPreAuctionItem } from '@/@types/AuctionItem';

import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetBestAuctions = () => {
  const getBestAuctions = async (): Promise<IAuctionItem[]> => {
    const response = await httpClient.get(`${API_END_POINT.BEST}`);
    return response.data;
  };

  const { data: bestAuctions } = useSuspenseQuery({ queryKey: [QUERY_KEYS.BEST_AUCTIONS], queryFn: getBestAuctions });

  return { bestAuctions };
};
export const useGetImminentAuctions = () => {
  const getImminentAuctions = async (): Promise<IAuctionItem[]> => {
    const response = await httpClient.get(`${API_END_POINT.IMMINENT}`);
    return response.data;
  };

  const { data: imminentAuctions } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.IMMINENT_AUCTIONS],
    queryFn: getImminentAuctions,
  });

  return { imminentAuctions };
};
export const useGetPreAuctions = () => {
  const getPreAuctions = async (): Promise<IPreAuctionItem[]> => {
    const response = await httpClient.get(`${API_END_POINT.PRE_AUCTION}?sort=most-liked,product-newest&page=0&size=5`);
    if (!response.data || !response.data.items) {
      throw new Error('No items found in the response');
    }

    return response.data.items;
  };

  const { data: preAuctions } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.PRE_AUCTIONS],
    queryFn: getPreAuctions,
  });

  return { preAuctions };
};
