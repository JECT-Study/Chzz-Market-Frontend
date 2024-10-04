import { HttpHandler, HttpResponse, delay, http } from 'msw';

import { API_END_POINT } from '@/constants/api';
import type { INotification } from 'Notification';
import { notificationData } from '../data/notificationData';

let notifications = [...notificationData];

export const notificationsHandler: HttpHandler = http.get(`${API_END_POINT.NOTIFICATIONS}`, async () => {
  await delay(1500);
  return HttpResponse.json(notifications);
});

export const notificationReadHandler: HttpHandler = http.post(`${API_END_POINT.NOTIFICATIONS}/:id/read`, ({ params }) => {
  const id = params.id as string;

  const notificationId = parseInt(id, 10);

  notifications = notifications.map((el: INotification) => (el.auctionId === notificationId ? { ...el, isRead: true } : el));

  return HttpResponse.json({ data: notifications, status: 204 });
});

export const notificationDeleteHandler: HttpHandler = http.delete(`${API_END_POINT.NOTIFICATIONS}/:id`, ({ params }) => {
  const id = params.id as string;

  const notificationId = parseInt(id, 10);

  notifications = notifications.filter((el) => el.auctionId !== notificationId);

  return HttpResponse.json({ data: notifications, status: 204 });
});
