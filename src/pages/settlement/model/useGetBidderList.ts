import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getBidderList } from '../api';

export const useGetBidderList = (auctionId: number) => {
  const { data: bidderList } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.BIDDER_LIST, auctionId],
    queryFn: () => getBidderList(auctionId),
  });

  return { bidderList };
};
