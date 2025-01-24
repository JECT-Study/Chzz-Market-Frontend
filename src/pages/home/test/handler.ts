// src/mocks/handlers.ts
import { HttpHandler, HttpResponse, http } from 'msw';
import { bestAuctionsData, imminentAuctionsData, preAuctionsData } from './data';

import { API_END_POINT } from '@/shared';

export const homeAuctionsHandler: HttpHandler = http.get(`${import.meta.env.VITE_API_URL}${API_END_POINT.AUCTION}`, async ({ request }) => {
  const url = new URL(request.url);

  const status = url.searchParams.get('status');
  const minutes = url.searchParams.get('minutes');

  if (status === 'proceeding') {
    if (minutes === '60') {
      return HttpResponse.json({
        items: imminentAuctionsData,
      });
    } else {
      return HttpResponse.json({
        items: bestAuctionsData,
      });
    }
  } else if (status === 'pre') {
    return HttpResponse.json({
      items: preAuctionsData,
    });
  }
});
