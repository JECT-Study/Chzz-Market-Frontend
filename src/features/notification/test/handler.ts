import { HttpHandler, HttpResponse, http } from 'msw';

import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { type INotification } from '../config/type';
import { notificationData, realTimeNotificationData } from './data';

let notificationList = [...notificationData];

export const notificationListHandler: HttpHandler = http.get(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.NOTIFICATION_LIST}`,
  async () => {
    return HttpResponse.json({
      items: notificationList
    });
  }
);

export const notificationReadHandler: HttpHandler = http.post(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.NOTIFICATION_LIST}/:id/read`,
  ({ params }) => {
    const { id } = params;

    notificationList = notificationList.map((el: INotification) =>
      el.notificationId === Number(id) ? { ...el, isRead: true } : el
    );
    return HttpResponse.json({
      items: notificationList
    });
  }
);

export const notificationDeleteHandler: HttpHandler = http.delete(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.NOTIFICATION_LIST}/:id`,
  ({ params }) => {
    const { id } = params;

    notificationList = notificationList.filter(
      (el) => el.notificationId !== Number(id)
    );
    return HttpResponse.json({
      items: notificationList
    });
  }
);

// 문자열을 UTF-8 형식으로 인코딩하는 객체
const encoder = new TextEncoder();

export const realTimeNotificationsHandler: HttpHandler = http.get(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.REALTIME_NOTIFICATIONS}`,
  () => {
    const stream = new ReadableStream({
      start(controller) {
        realTimeNotificationData.forEach((message, idx) => {
          setTimeout(() => {
            controller.enqueue(encoder.encode(message));
          }, [1000, 4000, 7000][idx]);
        });
      }
    });

    return new HttpResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream'
      }
    });
  }
);
