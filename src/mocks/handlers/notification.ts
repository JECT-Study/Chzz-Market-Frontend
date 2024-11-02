import { HttpHandler, HttpResponse, delay, http } from 'msw';

import { serverAPI } from '@/app/main';
import type { INotification } from '@/features/notification/config/type';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { notificationData } from '../data/notificationData';

let notifications = [...notificationData];

export const notificationsHandler: HttpHandler = http.get(`${serverAPI(API_END_POINT.NOTIFICATIONS)}`, async () => {
  await delay(1000);
  return HttpResponse.json({
    items: notifications,
  });
});

export const notificationReadHandler: HttpHandler = http.post(`${serverAPI(API_END_POINT.NOTIFICATIONS)}/:id/read`, ({ params }) => {
  const id = params.id as string;

  const notificationId = parseInt(id, 10);

  notifications = notifications.map((el: INotification) => (el.notificationId === notificationId ? { ...el, isRead: true } : el));

  return HttpResponse.json({ data: notifications });
});

export const notificationDeleteHandler: HttpHandler = http.delete(`${serverAPI(API_END_POINT.NOTIFICATIONS)}/:id`, ({ params }) => {
  const id = params.id as string;

  const notificationId = parseInt(id, 10);

  notifications = notifications.filter((el) => el.notificationId !== notificationId);

  return HttpResponse.json({ data: notifications });
});
