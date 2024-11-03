import { API_END_POINT, QUERY_KEYS, httpClient } from '@/shared';
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import type { INotification } from '../config';

export const useDeleteNotification = (): {
  mutate: UseMutateFunction<unknown, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();

  const deleteNotification = async (id: number) => {
    await httpClient.delete(`${API_END_POINT.NOTIFICATIONS}/${id}`);
    return;
  };

  const { mutate } = useMutation({
    mutationFn: deleteNotification,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
      const previousData = queryClient.getQueryData([QUERY_KEYS.NOTIFICATIONS]);
      queryClient.setQueryData([QUERY_KEYS.NOTIFICATIONS], (oldData: INotification[]) => {
        if (!oldData) return oldData;

        return oldData.filter((el: INotification) => el.notificationId !== id);
      });

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
    },
    onError: (_err, _var, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([QUERY_KEYS.NOTIFICATIONS], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
    },
  });

  return { mutate };
};
