import { HttpHandler, HttpResponse, delay, http } from 'msw';
import { bestAuctionsData, imminentAuctionsData, preRegisterAuctionsData } from '../data/homeAuctionsData';

import { API_END_POINT } from '@/constants/api';

export const bestAuctionsHandler: HttpHandler = http.get(`${API_END_POINT.BEST}`, async () => {
  await delay(1500);
  return HttpResponse.json(bestAuctionsData);
});

export const imminentAuctionsHandler: HttpHandler = http.get(`${API_END_POINT.IMMINENT}`, async () => {
  await delay(1500);
  return HttpResponse.json(imminentAuctionsData);
});
export const preRegisterAuctionsHandler: HttpHandler = http.get(`${API_END_POINT.PRE_AUCTION}`, async () => {
  await delay(1500);
  return HttpResponse.json(preRegisterAuctionsData);
});
