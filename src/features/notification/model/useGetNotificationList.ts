import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { isLoggedIn } from '@/features/auth/model/authSlice';
import { useSelector } from 'react-redux';
import { getNotificationList } from '../api/getNotificationList';

export const useGetNotificationList = () => {
  const isLogin = useSelector(isLoggedIn);

  const { data: notificationList } = useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATION_LIST],
    queryFn: getNotificationList,
    enabled: isLogin
  });

  return { notificationList };
};

export const useGetNotificationListWithSuspense = () => {
  const { data: notificationList } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.NOTIFICATION_LIST],
    queryFn: getNotificationList
  });

  return { notificationList };
};
