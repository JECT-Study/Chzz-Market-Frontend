import {
  UseMutateFunction,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { heartAuction } from '@/features/details/api/heartAuction';

export const useToggleAuctionListHeart = (): {
  mutate: UseMutateFunction<any, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: heartAuction,
    onSuccess: (_, preAuctionId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.HEART_LIST]
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AUCTION_DETAILS, preAuctionId]
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PRE_AUCTION_LIST]
      });
    }
  });

  return { mutate };
};
