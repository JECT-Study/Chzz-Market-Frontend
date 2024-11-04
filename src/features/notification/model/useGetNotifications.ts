import { API_END_POINT, QUERY_KEYS, httpClient } from '@/shared';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { isLoggedIn } from '@/features/auth/model/authSlice';
import { EmptyError } from '@/shared/lib';
import { useSelector } from 'react-redux';
import type { INotification } from '../config';

export const useGetNotifications = () => {
  const isLogin = useSelector(isLoggedIn);

  const getNotifications = async (): Promise<INotification[]> => {
    const response = await httpClient.get(`${API_END_POINT.NOTIFICATIONS}`);
    if (response.data.items.length === 0) {
      throw new EmptyError('notification');
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
    if (response.data.items.length === 0) {
      throw new EmptyError('notification');
    }

    return response.data.items;
  };

  const { data: notifications } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.NOTIFICATIONS],
    queryFn: getNotifications,
  });

  return { notifications };
};
