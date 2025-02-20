import { HttpHandler, HttpResponse, delay, http } from 'msw';

import type { IBidPostData } from '@/features/bid';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { auctionDetailsData } from './data';

let curDetailsData = [...auctionDetailsData];

export const auctionDetailsHandler: HttpHandler = http.get(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.AUCTION}/:auctionId`,
  async ({ params }) => {
    const { auctionId } = params;
    await delay(500);

    return HttpResponse.json(
      curDetailsData.find((data) => data.auctionId === Number(auctionId))
    );
  }
);

export const deletePreAuctionHandler: HttpHandler = http.delete(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.AUCTION}/:preAuctionId`,
  () => {
    return HttpResponse.json({ status: 200 });
  }
);

export const convertPreAuctionHandler: HttpHandler = http.post(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.AUCTION}/:preAuctionId/start`,
  ({ params }) => {
    const { preAuctionId } = params;
    const idx = curDetailsData.findIndex(
      (el) => el.auctionId === Number(preAuctionId)
    );

    if (idx !== -1) {
      curDetailsData = curDetailsData.map((item, index) =>
        index === idx
          ? {
              ...item,
              timeRemaining: 86400,
              participantCount: 0,
              isParticipated: false,
              bidId: null,
              bidAmount: 0,
              remainingBidCount: 3,
              isCancelled: false,
              isWinner: false,
              isWon: false,
              isOrdered: false
            }
          : item
      );
    }

    return HttpResponse.json({ status: 200 });
  }
);

export const heartAuctionHandler: HttpHandler = http.post(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.AUCTION}/:preAuctionId/likes`,
  () => {
    return HttpResponse.json({ status: 200 });
  }
);

export const cancelBidHandler: HttpHandler = http.patch(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.BID}/:bidId/cancel`,
  async ({ params }) => {
    const { bidId } = params;
    const idx = curDetailsData.findIndex(
      (el) => 'bidId' in el && el.bidId === Number(bidId)
    );

    if (idx !== -1) {
      curDetailsData = curDetailsData.map((item, index) =>
        index === idx
          ? {
              ...item,
              isCancelled: true
            }
          : item
      );
    }

    return HttpResponse.json({ status: 200 });
  }
);

export const postBidHandler: HttpHandler = http.post(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.BID}`,
  async ({ request }) => {
    const data = await request.json();
    const { auctionId, bidAmount } = data as IBidPostData;

    curDetailsData = curDetailsData.map((el) =>
      el.auctionId === auctionId
        ? {
            ...el,
            bidAmount,
            remainingBidCount: 0
          }
        : el
    );

    return HttpResponse.json({ status: 200 });
  }
);
