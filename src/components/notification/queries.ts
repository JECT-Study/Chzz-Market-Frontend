import { UseMutateFunction, useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { isLoggedIn } from '@/features/auth/model/authSlice';
import type { INotification } from '@/features/notification/config/type';
import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
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
    queryKey: [QUERY_KEYS.NOTIFICATIONS],
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
    queryKey: [QUERY_KEYS.NOTIFICATIONS],
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
      queryClient.setQueryData([QUERY_KEYS.NOTIFICATIONS], data);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
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
