import { HttpHandler, HttpResponse, delay, http } from 'msw';

import { API_END_POINT } from '@/constants/api';
import { preRegisterHeartData } from '../data/preRegisterHeartData';

let curPreRegisterHeartData = [...preRegisterHeartData];

export const preRegisterHeartHandler: HttpHandler = http.get(`${API_END_POINT.PRE_REGISTER}/history`, async () => {
  await delay(1000);
  return HttpResponse.json(curPreRegisterHeartData);
});

export const preRegisterHeartDeleteHandler: HttpHandler = http.delete(`${API_END_POINT.PRE_REGISTER}/:id`, ({ params }) => {
  const id = params.id as string;
  const heartId = parseInt(id, 10);

  curPreRegisterHeartData = curPreRegisterHeartData.filter((el) => el.id !== heartId);

  return HttpResponse.json({ data: curPreRegisterHeartData, status: 204 });
});
