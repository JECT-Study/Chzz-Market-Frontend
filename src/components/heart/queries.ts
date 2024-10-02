import { UseMutateFunction, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { API_END_POINT } from '@/constants/api';
import type { IPreAuctionItem } from 'AuctionItem';
import { httpClient } from '@/api/axios';
import { queryKeys } from '@/constants/queryKeys';

export const useGetPreRegisterHeart = () => {
  const getPreRegisterHeart = async (): Promise<IPreAuctionItem[]> => {
    const response = await httpClient.get(`${API_END_POINT.PRE_REGISTER}/history`);

    return response.data.items;
  };

  const { data: preRegisterHeartList } = useSuspenseQuery({
    queryKey: [queryKeys.PRE_REGISTER_HEART],
    queryFn: getPreRegisterHeart,
  });

  return { preRegisterHeartList };
};

export const useDeletePreRegisterHeart = (): {
  mutate: UseMutateFunction<IPreAuctionItem[], Error, number, unknown>;
} => {
  const queryClient = useQueryClient();
  const deletePreRegisterHeart = async (id: number) => {
    const response = await httpClient.delete(`${API_END_POINT.PRE_REGISTER}/${id}`);
    return response.data.data;
  };

  const { mutate } = useMutation({
    mutationFn: deletePreRegisterHeart,
    onSuccess: (data: IPreAuctionItem[]) => {
      queryClient.setQueryData([queryKeys.PRE_REGISTER_HEART], data);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PRE_REGISTER_HEART],
      });
    },
  });

  return { mutate };
};
