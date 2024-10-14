import { HttpHandler, HttpResponse, delay, http } from 'msw';
import { bestAuctionsData, imminentAuctionsData, preRegisterAuctionsData } from '../data/homeAuctionsData';

import { API_END_POINT } from '@/constants/api';
import { serverAPI } from '@/main';

export const bestAuctionsHandler: HttpHandler = http.get(serverAPI(API_END_POINT.BEST), async () => {
  await delay(1000);
  return HttpResponse.json(bestAuctionsData);
});

export const imminentAuctionsHandler: HttpHandler = http.get(serverAPI(API_END_POINT.IMMINENT), async () => {
  await delay(1000);
  return HttpResponse.json(imminentAuctionsData);
});
export const preRegisterAuctionsHandler: HttpHandler = http.get(`${serverAPI(API_END_POINT.PRE_AUCTION)}?sort=most-liked&page=0&size=5`, async () => {
  await delay(1000);
  return HttpResponse.json({
    items: preRegisterAuctionsData,
  });
});
