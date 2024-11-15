import { QUERY_KEYS } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { getPreAuctionDetails } from '../api';

export const useGetPreAuctionDetails = (preAuctionId: number | undefined) => {
  const { data: preAuctionDetails } = useQuery({
    queryKey: [QUERY_KEYS.PRE_AUCTION_DETAILS, preAuctionId],
    queryFn: () => getPreAuctionDetails(preAuctionId),
    enabled: preAuctionId === undefined ? false : true,
  });

  return {
    preAuctionDetails,
  };
};
