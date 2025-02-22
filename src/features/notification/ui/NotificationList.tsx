import { EmptyBoundary } from '@/shared/ui/boundary/EmptyBoundary';
import type { INotification } from '../config/type';
import { NotificationItem } from './NotificationItem';
import { useGetNotificationListWithSuspense } from '../model/useGetNotificationList';

export const NotificationList = () => {
  const { notificationList } = useGetNotificationListWithSuspense();

  return (
    <EmptyBoundary type="notification" length={notificationList.length}>
      <ul className="mx-[-20px] my-[-12px] web:mx-[-32px] web:my-[-24px]">
        {notificationList.map((item: INotification) => (
          <NotificationItem key={item.notificationId} item={item} />
        ))}
      </ul>
    </EmptyBoundary>
  );
};
