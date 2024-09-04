import { HttpHandler, HttpResponse, http } from 'msw';

import { API_END_POINT } from '@/constants/api';
import { notificationData } from '../data/notificationData';

let notifications = [...notificationData];

export const notificationHandler: HttpHandler = http.get(
  `${API_END_POINT.NOTIFICATION}`,
  () => {
    return HttpResponse.json(notifications);
  },
);

export const notificationDeleteHandler: HttpHandler = http.delete(
  `${API_END_POINT.NOTIFICATION}/:id`,
  ({ params }) => {
    const id = params.id as string;

    const notificationId = parseInt(id, 10);

    notifications = notifications.filter((el) => el.id !== notificationId);

    return HttpResponse.json({ status: 204 });
  },
);
