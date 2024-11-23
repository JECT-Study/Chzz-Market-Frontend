import { QUERY_KEYS } from '@/shared';
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';

import { heartAuction } from '@/features/details/api';

export const useToggleAuctionListHeart = (): {
  mutate: UseMutateFunction<any, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: heartAuction,
    onSuccess: (_, preAuctionId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PRE_AUCTION_HEART_LIST],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PRE_AUCTION_DETAILS, preAuctionId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PRE_AUCTION_LIST],
      });
    },
  });

  return { mutate };
};
