import { QUERY_KEYS } from '@/shared';
import { getAuctionDetails } from '../api';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetAuctionDetails = <U>(auctionId: number): { details: U } => {
  const { data: details } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.AUCTION_DETAILS, auctionId],
    queryFn: () => getAuctionDetails<U>(auctionId)
  });

  return { details };
};
