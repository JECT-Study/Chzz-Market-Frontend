import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { API_END_POINT } from '@/constants/api';
import { NotificationType } from 'Notification';
import { httpClient } from '@/api/axios';
import { queryKeys } from '@/constants/queryKeys';

export const useGetNotifications = () => {
  const getNotifications = async (): Promise<NotificationType[]> => {
    const response = await httpClient.get(`${API_END_POINT.NOTIFICATIONS}`);

    return response.data;
  };

  const { isLoading, data: notifications } = useQuery({
    queryKey: [queryKeys.NOTIFICATIONS],
    queryFn: () => getNotifications(),
  });

  return { isLoading, notifications };
};

export const useReadNotification = (): {
  mutate: UseMutateFunction<unknown, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();

  const readNotification = async (id: number) => {
    await httpClient.post(`${API_END_POINT.NOTIFICATIONS}/${id}/read`);
  };

  const { mutate } = useMutation({
    mutationFn: readNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.NOTIFICATIONS] });
    },
  });

  return { mutate };
};

export const useDeleteNotification = (): {
  mutate: UseMutateFunction<unknown, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();

  const deleteNotification = async (id: number) => {
    await httpClient.delete(`${API_END_POINT.NOTIFICATIONS}/${id}`);
  };

  const { mutate } = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.NOTIFICATIONS] });
    },
  });

  return { mutate };
};
