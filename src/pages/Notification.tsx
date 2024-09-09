import {
  useDeleteNotification,
  useGetNotifications,
  useReadNotification,
} from '@/components/notification/queries';

import NotificationItem from '@/components/notification/NotificationItem';
import type { NotificationType } from 'Notification';
import { useEffect } from 'react';
import { useNavigationContext } from '@/components/navigation/NavigationContext';

const Notification = () => {
  const { isLoading, notifications } = useGetNotifications();
  const { handleNavigationState } = useNavigationContext();
  const { mutate: deleteNotification } = useDeleteNotification();
  const { mutate: readNotification } = useReadNotification();

  const clickDelete = (id: number) => deleteNotification(id);
  const clickRead = (id: number) => readNotification(id);

  useEffect(() => {
    handleNavigationState({
      title: '알림',
      active: 'notification',
    });
  }, [handleNavigationState]);

  if (isLoading) return <p>Loading...</p>;
  if (!notifications) return <p>Notifications not found</p>;

  return (
    <div className="mx-[-32px] my-[-16px]">
      {notifications.map((item: NotificationType) => (
        <NotificationItem
          key={item.id}
          item={item}
          handleDelete={clickDelete}
          handleRead={clickRead}
        />
      ))}
    </div>
  );
};

export default Notification;
