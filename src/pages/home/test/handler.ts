// src/mocks/handlers.ts
import { HttpResponse, delay, http } from 'msw';
import { bestAuctionsData, imminentAuctionsData, preAuctionsData } from './data';

import { API_END_POINT } from '@/shared';

// 환경 변수 설정 (VITE_API_URL이 정의되어 있는지 확인)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const bestAuctionsHandler = http.get(`${API_URL}${API_END_POINT.BEST}`, async (req, res, ctx) => {
  await delay(1000); // 1초 지연
  return HttpResponse.json({
    items: bestAuctionsData,
  });
});

export const imminentAuctionsHandler = http.get(`${API_URL}${API_END_POINT.IMMINENT}`, async () => {
  await delay(1000); // 1초 지연
  return HttpResponse.json({
    items: imminentAuctionsData,
  });
});

export const preAuctionsHandler = http.get(`${API_URL}${API_END_POINT.PRE_AUCTION}`, async (req, res, ctx) => {
  await delay(1000); // 1초 지연
  return HttpResponse.json({
    items: preAuctionsData,
  });
});
