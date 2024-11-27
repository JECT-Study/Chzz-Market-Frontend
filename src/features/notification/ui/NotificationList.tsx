import { EmptyBoundary } from "@/shared";
import { useGetNotificationsWithSuspense } from "..";
import type { INotification } from "../config";
import { NotificationItem } from "./NotificationItem";

export const NotificationList = () => {
  const { notifications } = useGetNotificationsWithSuspense();

  return (
    <EmptyBoundary type="notification" length={notifications.length}>
      <ul className='mx-[-20px] my-[-12px] web:mx-[-32px] web:my-[-24px]'>
        {notifications.map((item: INotification) => (
          <NotificationItem key={item.notificationId} item={item} />
        ))}
      </ul>
    </EmptyBoundary>
  );
}