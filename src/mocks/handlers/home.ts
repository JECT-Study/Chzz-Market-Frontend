import { HttpHandler, HttpResponse, delay, http } from 'msw';

import { API_END_POINT } from '@/constants/api';
import {
  bestAuctionsData,
  imminentAuctionsData,
  preRegisterAuctionsData,
} from '../data/homeAuctionsData';

export const bestAuctionsHandler: HttpHandler = http.get(
  `${API_END_POINT.BEST}`,
  async () => {
    await delay(1500);
    return HttpResponse.json(bestAuctionsData);
  },
);

export const imminentAuctionsHandler: HttpHandler = http.get(
  `${API_END_POINT.IMMINENT}`,
  async () => {
    await delay(1500);
    return HttpResponse.json(imminentAuctionsData);
  },
);
export const preRegisterAuctionsHandler: HttpHandler = http.get(
  `${API_END_POINT.PRE_REGISTER}`,
  async () => {
    await delay(1500);
    return HttpResponse.json(preRegisterAuctionsData);
  },
);
