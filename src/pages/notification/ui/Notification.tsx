import { useGetNotificationsWithSuspense } from '@/features/notification';
import type { INotification } from '@/features/notification/config';
import { NotificationItem } from '@/features/notification/ui/NotificationItem';

export const Notification = () => {
  const { notifications } = useGetNotificationsWithSuspense();

  return (
    <div className='mx-[-20px] my-[-12px] web:mx-[-32px] web:my-[-24px]'>
      {notifications.map((item: INotification) => (
        <NotificationItem key={item.notificationId} item={item} />
      ))}
    </div>
  );
};