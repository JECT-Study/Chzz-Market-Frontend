import { HttpHandler, HttpResponse, delay, http } from 'msw';

import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { preAuctionHeartData } from '../data/preAuctionHeartData';

let curPreRegisterHeartData = [...preAuctionHeartData];

export const preRegisterHeartHandler: HttpHandler = http.get(`${API_END_POINT.PRE_AUCTION}/history`, async () => {
  await delay(1000);
  return HttpResponse.json(curPreRegisterHeartData);
});

export const preRegisterHeartDeleteHandler: HttpHandler = http.delete(`${API_END_POINT.PRE_AUCTION}/:id`, ({ params }) => {
  const id = params.id as string;
  const heartId = parseInt(id, 10);

  curPreRegisterHeartData = curPreRegisterHeartData.filter((el) => el.productId !== heartId);

  return HttpResponse.json({ data: curPreRegisterHeartData, status: 204 });
});
