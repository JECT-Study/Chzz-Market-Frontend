import { QUERY_KEYS } from '@/shared';
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';

import { readNotification } from '../api';

export const useReadNotification = (): {
  mutate: UseMutateFunction<unknown, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: readNotification,
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEYS.NOTIFICATIONS], data);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
    },
  });

  return { mutate };
};
