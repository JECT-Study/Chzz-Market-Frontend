import {
  useDeleteNotification,
  useGetNotifications,
  useReadNotification,
} from '@/components/notification/queries';

import NotificationItem from '@/components/notification/NotificationItem';
import type { NotificationType } from 'Notification';

const Notification = () => {
  const { notifications } = useGetNotifications();
  const { mutate: deleteNotification } = useDeleteNotification();
  const { mutate: readNotification } = useReadNotification();

  const clickDelete = (id: number) => deleteNotification(id);
  const clickRead = (id: number) => readNotification(id);

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
