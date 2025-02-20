import {
  UseMutateFunction,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import type { IPreAuctionDetails } from '@/entities/auction';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { toast } from 'sonner';
import { heartAuction } from '../api';

export const useToggleAuctionDetailsHeart = (): {
  mutate: UseMutateFunction<any, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: heartAuction,
    onMutate: async (preAuctionId: number) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.AUCTION_DETAILS, preAuctionId]
      });

      const previousData = queryClient.getQueryData([
        QUERY_KEYS.AUCTION_DETAILS,
        preAuctionId
      ]);

      queryClient.setQueryData(
        [QUERY_KEYS.AUCTION_DETAILS, preAuctionId],
        (oldData: IPreAuctionDetails) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            isLiked: !oldData.isLiked,
            likeCount: oldData.isLiked
              ? oldData.likeCount - 1
              : oldData.likeCount + 1
          };
        }
      );

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.HEART_LIST]
      });
    },
    onError: (_err, preAuctionId, context) => {
      toast.error('찜 목록에 추가하지 못했습니다.');
      if (context?.previousData) {
        queryClient.setQueryData(
          [QUERY_KEYS.AUCTION_DETAILS, preAuctionId],
          context.previousData
        );
      }
    },
    onSettled: (_res, _err, preAuctionId: number) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AUCTION_DETAILS, preAuctionId]
      });
    }
  });

  return { mutate };
};
