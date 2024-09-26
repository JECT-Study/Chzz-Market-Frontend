import { API_END_POINT } from '@/constants/api';
import type { Bidder } from 'Bid';
import { httpClient } from '@/api/axios';
import { queryKeys } from '@/constants/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetBidderList = (auctionId: number, sort: 'desc' | 'asc') => {
  const getBidderList = async (): Promise<Bidder[]> => {
    const response = await httpClient.get(
      `${API_END_POINT.AUCTIONS}/${auctionId}/bids/?sort=amount,${sort}`,
    );

    return response.data;
  };

  const { data: bidderList } = useSuspenseQuery({
    queryKey: [queryKeys.BIDDER_LIST, auctionId, sort],
    queryFn: getBidderList,
  });

  return { bidderList };
};
