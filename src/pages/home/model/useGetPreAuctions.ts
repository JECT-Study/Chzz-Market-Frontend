import { QUERY_KEYS } from '@/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getPreAuctions } from '../api';

export const useGetPreAuctions = () => {
  const { data: preAuctions } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.PRE_AUCTIONS],
    queryFn: getPreAuctions,
  });

  return { preAuctions };
};
