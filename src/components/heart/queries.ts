import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { API_END_POINT } from '@/constants/api';
import { PreRegisterProduct } from 'Product';
import { httpClient } from '@/api/axios';
import { queryKeys } from '@/constants/queryKeys';

export const useGetPreRegisterHeart = () => {
  const getPreRegisterHeart = async (): Promise<PreRegisterProduct[]> => {
    const response = await httpClient.get(
      `${API_END_POINT.PRE_REGISTERED_HEART}`,
    );

    return response.data;
  };

  const { isLoading, data: preRegisterHeartList } = useQuery({
    queryKey: [queryKeys.PRE_REGISTER_HEART],
    queryFn: () => getPreRegisterHeart(),
  });

  return { isLoading, preRegisterHeartList };
};

export const useDeletePreRegisterHeart = (): {
  mutate: UseMutateFunction<void, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();
  const deletePreRegisterHeart = async (id: number) => {
    await httpClient.delete(`${API_END_POINT.PRE_REGISTERED_HEART}/${id}`);
  };

  const { mutate } = useMutation({
    mutationFn: deletePreRegisterHeart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PRE_REGISTER_HEART],
      });
    },
  });

  return { mutate };
};
