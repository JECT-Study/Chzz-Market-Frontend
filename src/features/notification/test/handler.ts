import { HttpHandler, HttpResponse, delay, http } from 'msw';

import { API_END_POINT } from '@/shared';
import { serverAPI } from '@/shared/api/msw/setupTests';
import { notificationData, realTimeNotificationData } from '.';
import { type INotification } from '../config';

let notificationList = [...notificationData];

export const notificationListHandler: HttpHandler = http.get(`${serverAPI(API_END_POINT.NOTIFICATION_LIST)}`, async () => {
  await delay(1000);

  return HttpResponse.json({
    items: notificationList,
  });
});

export const notificationReadHandler: HttpHandler = http.post(`${serverAPI(API_END_POINT.NOTIFICATION_LIST)}/:id/read`, ({ params }) => {
  const id = params.id as string;

  const notificationId = parseInt(id, 10);

  notificationList = notificationList.map((el: INotification) => (el.notificationId === notificationId ? { ...el, isRead: true } : el));
  return;
});

export const notificationDeleteHandler: HttpHandler = http.delete(`${serverAPI(API_END_POINT.NOTIFICATION_LIST)}/:id`, ({ params }) => {
  const id = params.id as string;

  const notificationId = parseInt(id, 10);

  notificationList = notificationList.filter((el) => el.notificationId !== notificationId);
  return;
});

// 문자열을 UTF-8 형식으로 인코딩하는 객체
const encoder = new TextEncoder();

export const realTimeNotificationsHandler: HttpHandler = http.get(`${serverAPI(API_END_POINT.REALTIME_NOTIFICATIONS)}`, () => {
  const stream = new ReadableStream({
    start(controller) {
      realTimeNotificationData.forEach((message, idx) => {
        setTimeout(() => {
          controller.enqueue(encoder.encode(message));
        }, [1000, 4000, 7000][idx]);
      });
    },
  });

  return new HttpResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
    },
  });
});
