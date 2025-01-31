import { HttpHandler, HttpResponse, delay, http } from 'msw';

import { API_END_POINT } from '@/shared';
import { auctionDetailsData } from './data';

export const auctionDetailsHandler: HttpHandler = http.get(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.AUCTION}/:auctionId`,
  async ({ params }) => {
    const { auctionId } = params;
    await delay(1000);

    return HttpResponse.json(
      auctionDetailsData.find((data) => data.auctionId === Number(auctionId))
    );
  }
);
