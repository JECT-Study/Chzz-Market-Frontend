import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import {
  UseMutateFunction,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import { deleteNotification } from '../api/deleteNotification';
import type { INotification } from '../config/type';

export const useDeleteNotification = (): {
  mutate: UseMutateFunction<unknown, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNotification,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.NOTIFICATION_LIST]
      });
      const previousData = queryClient.getQueryData([
        QUERY_KEYS.NOTIFICATION_LIST
      ]);
      queryClient.setQueryData(
        [QUERY_KEYS.NOTIFICATION_LIST],
        (oldData: INotification[]) => {
          if (!oldData) return oldData;

          return oldData.filter(
            (el: INotification) => el.notificationId !== id
          );
        }
      );

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.NOTIFICATION_LIST]
      });
    },
    onError: (_err, _var, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [QUERY_KEYS.NOTIFICATION_LIST],
          context.previousData
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.NOTIFICATION_LIST]
      });
    }
  });

  return { mutate };
};
