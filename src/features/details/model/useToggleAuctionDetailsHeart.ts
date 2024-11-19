import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';

import type { IPreAuctionDetails } from '@/entities';
import { QUERY_KEYS } from '@/shared';
import { toast } from 'sonner';
import { heartAuction } from '../api';

export const useToggleAuctionDetailsHeart = (): {
  mutate: UseMutateFunction<any, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: heartAuction,
    onMutate: async (preAuctionId: number) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.PRE_AUCTION_DETAILS, preAuctionId] });

      const previousData = queryClient.getQueryData([QUERY_KEYS.PRE_AUCTION_DETAILS, preAuctionId]);

      queryClient.setQueryData([QUERY_KEYS.PRE_AUCTION_DETAILS, preAuctionId], (oldData: IPreAuctionDetails) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          isLiked: !oldData.isLiked,
          likeCount: oldData.isLiked ? oldData.likeCount - 1 : oldData.likeCount + 1,
        };
      });

      return { previousData };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PRE_AUCTION_HEART_LIST],
      });
      if (data.isLiked) toast.success('찜 목록에 추가되었습니다.');
      else toast.success('찜 목록에 제외되었습니다.');
    },
    onError: (_err, preAuctionId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([QUERY_KEYS.PRE_AUCTION_DETAILS, preAuctionId], context.previousData);
      }
    },
    onSettled: (_res, _err, preAuctionId: number) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PRE_AUCTION_DETAILS, preAuctionId],
      });
    },
  });

  return { mutate };
};