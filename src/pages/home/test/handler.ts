// src/mocks/handlers.ts
import { HttpHandler, HttpResponse, delay, http } from 'msw';
import { bestAuctionsData, imminentAuctionsData, preAuctionsData } from './data';

import { API_END_POINT } from '@/shared';
import { serverAPI } from '@/shared/api/msw/setupTests';

export const bestAuctionsHandler: HttpHandler = http.get(`${serverAPI(API_END_POINT.BEST)}`, async () => {
  await delay(1000);
  return HttpResponse.json({
    items: bestAuctionsData,
  });
});

export const imminentAuctionsHandler: HttpHandler = http.get(`${serverAPI(API_END_POINT.IMMINENT)}`, async () => {
  await delay(1000);
  return HttpResponse.json({
    items: imminentAuctionsData,
  });
});

export const preAuctionsHandler: HttpHandler = http.get(`${serverAPI(API_END_POINT.PRE_AUCTION)}`, async () => {
  await delay(1000);
  return HttpResponse.json({
    items: preAuctionsData,
  });
});
