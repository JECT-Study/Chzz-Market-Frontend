import { HttpHandler, HttpResponse, delay, http } from 'msw';

import { API_END_POINT } from '@/constants/api';
import { auctionDetailsData } from '../data/auctionDetailsData';

export const auctionDetailsHandler: HttpHandler = http.get(
  `${API_END_POINT.AUCTIONS}/:auctionId`,
  async ({ params }) => {
    await delay(2000);
    const { auctionId } = params;
    return HttpResponse.json(auctionDetailsData[Number(auctionId)]);
  },
);
