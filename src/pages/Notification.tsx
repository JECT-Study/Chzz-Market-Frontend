import {
  useDeleteNotification,
  useGetNotifications,
  useReadNotification,
} from '@/components/notification/queries';

import Layout from '@/components/layout/Layout';
import Navigation from '@/components/Navigation';
import NotificationItem from '@/components/notification/NotificationItem';
import type { NotificationType } from 'Notification';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const navigate = useNavigate();
  const { isLoading, notifications } = useGetNotifications();
  const { mutate: deleteNotification } = useDeleteNotification();
  const { mutate: readNotification } = useReadNotification();

  const clickDelete = (id: number) => deleteNotification(id);
  const clickRead = (id: number) => readNotification(id);

  if (isLoading) return <p>Loading...</p>;
  if (!notifications) return <p>Notifications not found</p>;

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate(-1)}>알림</Layout.Header>
      <Layout.Main>
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
      </Layout.Main>
      <Layout.Footer type="single">
        <Navigation active="notification" />
      </Layout.Footer>
    </Layout>
  );
};

export default Notification;
