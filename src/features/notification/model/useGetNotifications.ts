import { QUERY_KEYS } from '@/shared';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { isLoggedIn } from '@/features/auth/model/authSlice';
import { useSelector } from 'react-redux';
import { getNotifications } from '../api';

export const useGetNotifications = () => {
  const isLogin = useSelector(isLoggedIn);

  const { data: notifications } = useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATIONS],
    queryFn: getNotifications,
    enabled: isLogin,
  });

  return { notifications };
};

export const useGetNotificationsWithSuspense = () => {
  const { data: notifications } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.NOTIFICATIONS],
    queryFn: getNotifications,
  });

  return { notifications };
};
