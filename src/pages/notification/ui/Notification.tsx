import { EmptyBoundary } from '@/shared';
import type { INotification } from '@/features/notification/config';
import { NotificationItem } from '@/features/notification/ui/NotificationItem';
import { useGetNotificationsWithSuspense } from '@/features/notification';

export const Notification = () => {
  const { notifications } = useGetNotificationsWithSuspense();
  return (
    <EmptyBoundary length={notifications.length} name='notification'>
      <div className='mx-[-20px] my-[-12px] web:mx-[-32px] web:my-[-24px]'>
        {notifications.map((item: INotification) => (
          <NotificationItem key={item.notificationId} item={item} />
        ))}
      </div>
    </EmptyBoundary>
  );
};