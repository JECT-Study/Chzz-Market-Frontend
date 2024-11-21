import { API_END_POINT, QUERY_KEYS, httpClient } from '@/shared';
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleAuctionListHeart = (): {
  mutate: UseMutateFunction<any, Error, number, unknown>;
} => {
  const heartAuctionItem = async (preAuctionId: number): Promise<{ isLiked: boolean; likeCount: number }> => {
    const response = await httpClient.post(`${API_END_POINT.PRE_AUCTION}/${preAuctionId}/likes`);

    return response.data;
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: heartAuctionItem,
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
