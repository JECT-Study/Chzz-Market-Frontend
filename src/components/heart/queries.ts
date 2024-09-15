import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/api/axios';
import { queryKeys } from '@/constants/queryKeys';
import { PreRegisterAuction } from 'Auction';

export const useGetPreRegisterHeart = () => {
  const getPreRegisterHeart = async (): Promise<PreRegisterAuction[]> => {
    const response = await httpClient.get(
      `${API_END_POINT.PRE_REGISTERED_HEART}`,
    );

    return response.data;
  };

  const { data: preRegisterHeartList } = useSuspenseQuery({
    queryKey: [queryKeys.PRE_REGISTER_HEART],
    queryFn: getPreRegisterHeart,
  });

  return { preRegisterHeartList };
};

export const useDeletePreRegisterHeart = (): {
  mutate: UseMutateFunction<PreRegisterAuction[], Error, number, unknown>;
} => {
  const queryClient = useQueryClient();
  const deletePreRegisterHeart = async (id: number) => {
    const response = await httpClient.delete(
      `${API_END_POINT.PRE_REGISTERED_HEART}/${id}`,
    );
    return response.data.data;
  };

  const { mutate } = useMutation({
    mutationFn: deletePreRegisterHeart,
    onSuccess: (data: PreRegisterAuction[]) => {
      queryClient.setQueryData([queryKeys.PRE_REGISTER_HEART], data);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PRE_REGISTER_HEART],
      });
    },
  });

  return { mutate };
};
