import { HttpHandler, HttpResponse, http } from 'msw';

import { API_END_POINT } from '@/constants/api';
import type { NotificationType } from 'Notification';
import { notificationData } from '../data/notificationData';

let notifications = [...notificationData];

export const notificationsHandler: HttpHandler = http.get(
  `${API_END_POINT.NOTIFICATIONS}`,
  () => {
    return HttpResponse.json(notifications);
  },
);

export const notificationReadHandler: HttpHandler = http.post(
  `${API_END_POINT.NOTIFICATIONS}/:id/read`,
  ({ params }) => {
    const id = params.id as string;

    const notificationId = parseInt(id, 10);

    notifications = notifications.map((el: NotificationType) =>
      el.id === notificationId ? { ...el, check: true } : el,
    );

    return HttpResponse.json({ status: 204 });
  },
);

export const notificationDeleteHandler: HttpHandler = http.delete(
  `${API_END_POINT.NOTIFICATIONS}/:id`,
  ({ params }) => {
    const id = params.id as string;

    const notificationId = parseInt(id, 10);

    notifications = notifications.filter((el) => el.id !== notificationId);

    return HttpResponse.json({ status: 204 });
  },
);
