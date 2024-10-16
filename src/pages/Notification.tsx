import { useDeleteNotification, useGetNotificationsWithSuspense, useReadNotification } from '@/components/notification/queries';

import EmptyBoundary from '@/components/common/boundary/EmptyBoundary';
import NotificationItem from '@/components/notification/NotificationItem';
import type { INotification } from 'Notification';

const Notification = () => {
  const { notifications } = useGetNotificationsWithSuspense();
  const { mutate: deleteNotification } = useDeleteNotification();
  const { mutate: readNotification } = useReadNotification();

  const clickDelete = (id: number) => deleteNotification(id);
  const clickRead = (id: number) => readNotification(id);

  return (
    <EmptyBoundary length={notifications.length} name='notification'>
      <div className='mx-[-32px] my-[-16px]'>
        {notifications.map((item: INotification) => (
          <NotificationItem key={item.notificationId} item={item} handleDelete={clickDelete} handleRead={clickRead} />
        ))}
      </div>
    </EmptyBoundary>
  );
};

export default Notification;
