import { IBidder } from '@/features/bid/config/type';
import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetBidderList = (auctionId: number) => {
  const getBidderList = async (): Promise<IBidder[]> => {
    const response = await httpClient.get(`${API_END_POINT.AUCTION}/${auctionId}/bids?sort=bid-amount,desc`);

    return response.data.items;
  };

  const { data: bidderList } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.BIDDER_LIST, auctionId],
    queryFn: getBidderList,
  });

  return { bidderList };
};
