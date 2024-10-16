import { UseMutateFunction, useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { httpClient } from '@/api/axios';
import { API_END_POINT } from '@/constants/api';
import { queryKeys } from '@/constants/queryKeys';
import { isLoggedIn } from '@/store/authSlice';
import type { INotification } from 'Notification';
import { useSelector } from 'react-redux';

export const useGetNotifications = () => {
  const isLogin = useSelector(isLoggedIn);

  const getNotifications = async (): Promise<INotification[]> => {
    const response = await httpClient.get(`${API_END_POINT.NOTIFICATIONS}`);
    if (!response.data || !response.data.items) {
      throw new Error('No items found in the response');
    }
    return response.data.items;
  };

  const { data: notifications } = useQuery({
    queryKey: [queryKeys.NOTIFICATIONS],
    queryFn: getNotifications,
    enabled: isLogin,
  });

  return { notifications };
};

export const useGetNotificationsWithSuspense = () => {
  const getNotifications = async (): Promise<INotification[]> => {
    const response = await httpClient.get(`${API_END_POINT.NOTIFICATIONS}`);
    if (!response.data || !response.data.items) {
      throw new Error('No items found in the response');
    }
    return response.data.items;
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
