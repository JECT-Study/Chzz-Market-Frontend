import { UseMutateFunction, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/api/axios';
import { queryKeys } from '@/constants/queryKeys';
import { IPreAuctionItem } from 'AuctionItem';

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
  mutate: UseMutateFunction<IPreAuctionItem[], Error, number, unknown>;
} => {
  const queryClient = useQueryClient();
  const deletePreAuctionHeart = async (id: number) => {
    const response = await httpClient.delete(`${API_END_POINT.PRE_AUCTION}/${id}`);
    return response.data.data;
  };

  const { mutate } = useMutation({
    mutationFn: deletePreAuctionHeart,
    onSuccess: (data: IPreAuctionItem[]) => {
      queryClient.setQueryData([queryKeys.PRE_AUCTION_HEART_LIST], data);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PRE_AUCTION_HEART_LIST],
      });
    },
  });

  return { mutate };
};
