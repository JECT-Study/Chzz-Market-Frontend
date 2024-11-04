import { QUERY_KEYS } from '@/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getPreAuctionHeartList } from '../api';

export const useGetPreAuctionHeartList = () => {
  const { data: preAuctionHeartList } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.PRE_AUCTION_HEART_LIST],
    queryFn: getPreAuctionHeartList,
  });

  return { preAuctionHeartList };
};
