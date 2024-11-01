import { API_END_POINT, QUERY_KEYS, httpClient } from '@/shared';
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';

export const useReadNotification = (): {
  mutate: UseMutateFunction<unknown, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();

  const readNotification = async (id: number) => {
    const response = await httpClient.post(`${API_END_POINT.NOTIFICATIONS}/${id}/read`);

    return response.data.data;
  };

  const { mutate } = useMutation({
    mutationFn: readNotification,
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEYS.NOTIFICATIONS], data);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
    },
  });

  return { mutate };
};
