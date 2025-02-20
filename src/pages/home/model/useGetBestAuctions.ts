import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getBestAuctions } from '../api';

export const useGetBestAuctions = () => {
  const { data: bestAuctions } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.BEST_AUCTIONS],
    queryFn: getBestAuctions
  });

  return { bestAuctions: bestAuctions.items };
};
