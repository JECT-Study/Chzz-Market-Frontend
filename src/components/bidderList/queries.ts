import { API_END_POINT } from '@/constants/api';
import { BidderListType } from 'Bid';
import { httpClient } from '@/api/axios';
import { queryKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetBidderList = (auctionId: number, sort: 'desc' | 'asc') => {
  const getBidderList = async (): Promise<BidderListType[]> => {
    const response = await httpClient.get(
      `${API_END_POINT.AUCTIONS}/${auctionId}/bids/?sort=amount,${sort}`,
    );

    return response.data;
  };

  const { isLoading: isBidderListLoading, data: bidderList } = useQuery({
    queryKey: [queryKeys.BIDDER_LIST, auctionId, sort],
    queryFn: getBidderList,
  });

  return { isBidderListLoading, bidderList };
};
