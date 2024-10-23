import { useGetNotificationsWithSuspense } from '@/components/notification/queries';

import type { INotification } from '@/@types/Notification';
import EmptyBoundary from '@/components/common/boundary/EmptyBoundary';
import NotificationItem from '@/components/notification/NotificationItem';

const Notification = () => {
  const { notifications } = useGetNotificationsWithSuspense();

  return (
    <EmptyBoundary length={notifications.length} name='notification'>
      <div className='mx-[-32px] my-[-16px]'>
        {notifications.map((item: INotification) => (
          <NotificationItem key={item.notificationId} item={item} />
        ))}
      </div>
    </EmptyBoundary>
  );
};

export default Notification;
