import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';

import type { IPreAuctionItem } from '@/entities';
import { QUERY_KEYS } from '@/shared';
import { toast } from 'sonner';
import { deletePreAuctionHeart } from '../api';

export const useDeletePreAuctionHeart = (): {
  mutate: UseMutateFunction<void, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deletePreAuctionHeart,
    onMutate: async (preAuctionId: number) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.PRE_AUCTION_HEART_LIST] });
      const previousData = queryClient.getQueryData([QUERY_KEYS.PRE_AUCTION_HEART_LIST]);
      queryClient.setQueryData([QUERY_KEYS.PRE_AUCTION_HEART_LIST], (oldData: IPreAuctionItem[]) => {
        if (!oldData) return oldData;

        return oldData.filter((el: IPreAuctionItem) => el.productId !== preAuctionId);
      });

      return { previousData };
    },
    onSuccess: (_, preAuctionId: number) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PRE_AUCTION_DETAILS, preAuctionId],
      });
    },
    onError: (_err, _var, context) => {
      toast.error('찜 목록에서 제외하지 못했습니다.');
      if (context?.previousData) {
        queryClient.setQueryData([QUERY_KEYS.PRE_AUCTION_HEART_LIST], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PRE_AUCTION_HEART_LIST],
      });
    },
  });

  return { mutate };
};
