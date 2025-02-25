import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { getBidderList } from '../api/getBidderList';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetBidderList = (auctionId: number) => {
  const { data: bidderList } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.BIDDER_LIST, auctionId],
    queryFn: () => getBidderList(auctionId)
  });

  return { bidderList: bidderList.items };
};
