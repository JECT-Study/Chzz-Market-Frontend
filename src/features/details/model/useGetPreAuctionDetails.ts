import { QUERY_KEYS } from '@/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getPreAuctionDetails } from '../api';

export const useGetPreAuctionDetails = (preAuctionId: number) => {
  const { data: preAuctionDetails } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.PRE_AUCTION_DETAILS, preAuctionId],
    queryFn: () => getPreAuctionDetails(preAuctionId),
  });

  return {
    preAuctionDetails,
  };
};
