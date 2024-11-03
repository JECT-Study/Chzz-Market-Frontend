import { HttpHandler, HttpResponse, http } from 'msw';

import { serverAPI } from '@/app/main';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { realTimeNotificationData } from '../data/realTimeNotificationData';

// 문자열을 UTF-8 형식으로 인코딩하는 객체
const encoder = new TextEncoder();

export const realTimeNotificationsHandler: HttpHandler = http.get(serverAPI(API_END_POINT.REALTIME_NOTIFICATIONS), () => {
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
