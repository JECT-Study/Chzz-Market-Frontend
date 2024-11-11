import type { IAuctionDetails } from '@/entities';
import { QUERY_KEYS } from '@/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getAuctionDetails } from '../api';

export const useGetAuctionDetails = (auctionId: number): { auctionDetails: IAuctionDetails } => {
  const { data: auctionDetails } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.AUCTION_DETAILS, auctionId],
    queryFn: () => getAuctionDetails(auctionId),
  });

  return {
    auctionDetails,
  };
};
