import type { IPreAuctionList } from '@/entities/auction/types/list';
import {
  UseMutateFunction,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import type { IPreAuctionItem } from '@/entities/auction/types/item';
import { heartAuction } from '@/features/details/api/heartAuction';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { toast } from 'sonner';

export const useDeleteHeart = (): {
  mutate: UseMutateFunction<
    { isLiked: boolean; likeCount: number },
    Error,
    number,
    unknown
  >;
} => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: heartAuction,
    onMutate: async (preAuctionId: number) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.HEART_LIST] });
      const previousData = queryClient.getQueryData([QUERY_KEYS.HEART_LIST]);
      queryClient.setQueryData(
        [QUERY_KEYS.HEART_LIST],
        (oldData: IPreAuctionList) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            items: oldData.items.filter(
              (el: IPreAuctionItem) => el.auctionId !== preAuctionId
            )
          };
        }
      );

      return { previousData };
    },
    onSuccess: (_, preAuctionId: number) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AUCTION_DETAILS, preAuctionId]
      });
    },
    onError: (_err, _var, context) => {
      toast.error('찜 목록에서 제외하지 못했습니다.');
      if (context?.previousData) {
        queryClient.setQueryData([QUERY_KEYS.HEART_LIST], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.HEART_LIST]
      });
    }
  });

  return { mutate };
};
