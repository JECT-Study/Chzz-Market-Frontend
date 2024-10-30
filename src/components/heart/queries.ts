import { UseMutateFunction, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { IPreAuctionItem } from '@/@types/AuctionItem';
import { httpClient } from '@/api/axios';
import { API_END_POINT } from '@/constants/api';
import { queryKeys } from '@/constants/queryKeys';
import { toast } from 'sonner';

export const useGetPreAuctionHeartList = () => {
  const getPreAuctionHeartList = async (): Promise<IPreAuctionItem[]> => {
    const response = await httpClient.get(`${API_END_POINT.PRE_AUCTION}/history`);

    return response.data.items;
  };

  const { data: preAuctionHeartList } = useSuspenseQuery({
    queryKey: [queryKeys.PRE_AUCTION_HEART_LIST],
    queryFn: getPreAuctionHeartList,
  });

  return { preAuctionHeartList };
};

export const useDeletePreAuctionHeart = (): {
  mutate: UseMutateFunction<void, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();
  const deletePreAuctionHeart = async (preAuctionId: number) => {
    await httpClient.post(`${API_END_POINT.PRE_AUCTION}/${preAuctionId}/likes`);
  };

  const { mutate } = useMutation({
    mutationFn: deletePreAuctionHeart,
    onMutate: async (preAuctionId: number) => {
      await queryClient.cancelQueries({ queryKey: [queryKeys.PRE_AUCTION_HEART_LIST] });
      const previousData = queryClient.getQueryData([queryKeys.PRE_AUCTION_HEART_LIST]);
      queryClient.setQueryData([queryKeys.PRE_AUCTION_HEART_LIST], (oldData: IPreAuctionItem[]) => {
        if (!oldData) return oldData;

        return oldData.filter((el: IPreAuctionItem) => el.productId !== preAuctionId);
      });

      return { previousData };
    },
    onSuccess: (_, preAuctionId: number) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PRE_AUCTION_DETAILS, preAuctionId],
      });
      toast.success('찜 목록에서 제외되었습니다.');
    },
    onError: (_err, _var, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([queryKeys.PRE_AUCTION_HEART_LIST], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PRE_AUCTION_HEART_LIST],
      });
    },
  });

  return { mutate };
};
