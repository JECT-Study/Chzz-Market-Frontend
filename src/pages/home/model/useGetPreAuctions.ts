import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getPreAuctions } from '../api/getPreAuctions';

export const useGetPreAuctions = () => {
  const { data: preAuctions } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.PRE_AUCTIONS],
    queryFn: getPreAuctions
  });

  return { preAuctions: preAuctions.items };
};
