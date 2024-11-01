import { HttpHandler, HttpResponse, delay, http } from 'msw';

import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { auctionDetailsData } from '../data/auctionDetailsData';

export const auctionDetailsHandler: HttpHandler = http.get(`${API_END_POINT.AUCTION}/:auctionId`, async ({ params }) => {
  await delay(2000);
  const { auctionId } = params;
  return HttpResponse.json(auctionDetailsData[Number(auctionId)]);
});
