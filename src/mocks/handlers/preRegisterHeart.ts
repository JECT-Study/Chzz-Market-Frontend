import { HttpHandler, HttpResponse, http } from 'msw';

import { API_END_POINT } from '@/constants/api';
import { preRegisterHeartData } from '../data/preRegisterHeartData';

let curPreRegisterHeartData = [...preRegisterHeartData];

export const preRegisterHeartHandler: HttpHandler = http.get(
  `${API_END_POINT.PRE_REGISTERED_HEART}`,
  () => {
    return HttpResponse.json(curPreRegisterHeartData);
  },
);

export const preRegisterHeartDeleteHandler: HttpHandler = http.delete(
  `${API_END_POINT.PRE_REGISTERED_HEART}/:id`,
  ({ params }) => {
    const id = params.id as string;
    const heartId = parseInt(id, 10);

    curPreRegisterHeartData = curPreRegisterHeartData.filter(
      (el) => el.id !== heartId,
    );

    return HttpResponse.json({ status: 204 });
  },
);
