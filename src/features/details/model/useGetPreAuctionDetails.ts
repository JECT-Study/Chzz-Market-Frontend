import type { IPreAuctionDetails } from '@/entities';
import { QUERY_KEYS } from '@/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getPreAuctionDetails } from '../api';

export const useGetPreAuctionDetails = (preAuctionId: number): { preAuctionDetails: IPreAuctionDetails } => {
  const { data: preAuctionDetails } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.PRE_AUCTION_DETAILS, preAuctionId],
    queryFn: () => getPreAuctionDetails(preAuctionId),
  });

  return {
    preAuctionDetails,
  };
};
