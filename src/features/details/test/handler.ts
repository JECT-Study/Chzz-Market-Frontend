import { HttpHandler, HttpResponse, delay, http } from 'msw';

import { API_END_POINT } from '@/shared';
import { auctionDetailsData } from './data';

export const auctionDetailsHandler: HttpHandler = http.get(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.AUCTION}/:auctionId`,
  async ({ params }) => {
    const { auctionId } = params;
    await delay(500);

    const data = auctionDetailsData.filter(
      (data) => data.auctionId === Number(auctionId)
    );

    const isPreAuction = window.location.pathname.includes('pre-auction');

    // convert test 위해 auctionId 10 조건문 추가.
    return HttpResponse.json(
      Number(auctionId) === 10 ? (isPreAuction ? data[1] : data[0]) : data[0]
    );
  }
);

export const deletePreAuctionHandler: HttpHandler = http.delete(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.AUCTION}/:preAuctionId`,
  async () => {
    return HttpResponse.json({ status: 200 });
  }
);

export const convertPreAuctionHandler: HttpHandler = http.post(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.AUCTION}/:preAuctionId/start`,
  async () => {
    return HttpResponse.json({ status: 200 });
  }
);

export const heartAuctionHandler: HttpHandler = http.post(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.AUCTION}/:preAuctionId/likes`,
  async () => {
    return HttpResponse.json({ status: 200 });
  }
);
