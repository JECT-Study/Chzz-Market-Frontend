import { useDeleteNotification, useGetNotifications, useReadNotification } from '@/components/notification/queries';

import EmptyBoundary from '@/components/common/EmptyBoundary';
import type { INotification } from 'Notification';
import NotificationItem from '@/components/notification/NotificationItem';

const Notification = () => {
  const { notifications } = useGetNotifications();
  const { mutate: deleteNotification } = useDeleteNotification();
  const { mutate: readNotification } = useReadNotification();

  const clickDelete = (id: number) => deleteNotification(id);
  const clickRead = (id: number) => readNotification(id);

  return (
    <EmptyBoundary dataLength={notifications.length} type='알림'>
      <div className='mx-[-32px] my-[-16px]'>
        {notifications.map((item: INotification) => (
          <NotificationItem key={item.notificationId} item={item} handleDelete={clickDelete} handleRead={clickRead} />
        ))}
      </div>
    </EmptyBoundary>
  );
};

export default Notification;
