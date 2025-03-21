import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getImminentAuctions } from '../api/getImminentAuctions';

export const useGetImminentAuctions = () => {
  const { data: imminentAuctions } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.IMMINENT_AUCTIONS],
    queryFn: getImminentAuctions
  });

  return { imminentAuctions: imminentAuctions.items };
};
