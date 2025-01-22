import { HttpHandler, HttpResponse, delay, http } from 'msw';

import { API_END_POINT } from '@/shared';
import { heartData } from './data';
import { serverAPI } from '@/shared/api/msw/setupTests';

let curHeartData = [...heartData];

export const heartHandler: HttpHandler = http.get(`${serverAPI(API_END_POINT.PRE_AUCTION)}/history`, async () => {
  await delay(1000);

  return HttpResponse.json(curHeartData);
});

export const heartDeleteHandler: HttpHandler = http.delete(`${serverAPI(API_END_POINT.PRE_AUCTION)}/:id`, ({ params }) => {
  const id = params.id as string;
  const heartId = parseInt(id, 10);

  curHeartData = curHeartData.filter((el) => el.auctionId !== heartId);

  return HttpResponse.json({ data: curHeartData, status: 204 });
});
