import { httpClient } from '@/api/axios';
import { API_END_POINT } from '@/constants/api';
import { queryKeys } from '@/constants/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';
import { IBidder } from 'Bid';

export const useGetBidderList = (auctionId: number) => {
  const getBidderList = async (): Promise<IBidder[]> => {
    const response = await httpClient.get(`${API_END_POINT.AUCTIONS}/${auctionId}/bids?sort=bid-amount,desc`);

    return response.data.items;
  };

  const { data: bidderList } = useSuspenseQuery({
    queryKey: [queryKeys.BIDDER_LIST, auctionId],
    queryFn: getBidderList,
  });

  return { bidderList };
};
