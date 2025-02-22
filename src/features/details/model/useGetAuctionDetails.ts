import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getAuctionDetails } from '../api/getAuctionDetails';

export const useGetAuctionDetails = <U>(auctionId: number): { details: U } => {
  const { data: details } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.AUCTION_DETAILS, auctionId],
    queryFn: () => getAuctionDetails<U>(auctionId)
  });

  return { details };
};
