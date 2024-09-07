import { API_END_POINT } from '@/constants/api';
import { HttpHandler, HttpResponse, http } from 'msw';

const encoder = new TextEncoder();

export const realTimeNotificationsHandler: HttpHandler = http.get(
  `${API_END_POINT.REALTIME_NOTIFICATIONS}?userId=1`,
  () => {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            `id:1_1722845397097\nevent:init\ndata:Connection Established\n\n`,
          ),
        );

        setTimeout(() => {
          controller.enqueue(
            encoder.encode(
              `id:1_1722845403085\nevent:notification\ndata:{ "id": 1, "title": "내 경매 알림", "message": "[나이키] 신발 경매가 성공적으로 종료되었으며, 최종 구매자가 결정되었습니다.", "buttonName": "경매 참여자 목록 보러가기"}\n\n`,
            ),
          );
        }, 1_000);

        setTimeout(() => {
          controller.enqueue(
            encoder.encode(
              `id:1_1722845403090\nevent:notification\ndata:{ "id": 2, "title": "경매 취소 알림", "message": "경매 취소 알림 해당 경매의 참여자가 없어 경매가 유찰되었습니다.", "buttonName": "확인"}\n\n`,
            ),
          );
        }, 4_000);

        setTimeout(() => {
          controller.enqueue(
            encoder.encode(
              `id:1_1722845403175\nevent:notification\ndata:{ "id": 3, "title": "내 경매 알림", "message": "축하합니다! 경매에서 [나이키] 신발의 최종 구매자로 선정되었습니다.", "buttonName": "구매 확정하러 가기"}\n\n`,
            ),
          );
        }, 7_000);
      },
    });

    return new HttpResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
      },
    });
  },
);
