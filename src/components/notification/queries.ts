import { UseMutateFunction, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { API_END_POINT } from '@/constants/api';
import type { INotification } from 'Notification';
import { httpClient } from '@/api/axios';
import { queryKeys } from '@/constants/queryKeys';

export const useGetNotifications = () => {
  const getNotifications = async (): Promise<INotification[]> => {
    const response = await httpClient.get(`${API_END_POINT.NOTIFICATIONS}`);

    return response.data;
  };

  const { data: notifications } = useSuspenseQuery({
    queryKey: [queryKeys.NOTIFICATIONS],
    queryFn: getNotifications,
  });

  return { notifications };
};

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
      queryClient.setQueryData([queryKeys.NOTIFICATIONS], data);
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
    const response = await httpClient.delete(`${API_END_POINT.NOTIFICATIONS}/${id}`);
    return response.data.data;
  };

  const { mutate } = useMutation({
    mutationFn: deleteNotification,
    onSuccess: (data) => {
      queryClient.setQueryData([queryKeys.NOTIFICATIONS], data);
      queryClient.invalidateQueries({ queryKey: [queryKeys.NOTIFICATIONS] });
    },
  });

  return { mutate };
};
