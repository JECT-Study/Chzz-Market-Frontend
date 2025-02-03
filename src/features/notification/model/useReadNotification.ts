import { QUERY_KEYS } from '@/shared';
import {
  UseMutateFunction,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import { readNotification } from '../api';

export const useReadNotification = (): {
  mutate: UseMutateFunction<unknown, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: readNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.NOTIFICATION_LIST]
      });
    }
  });

  return { mutate };
};
