import { HttpHandler, HttpResponse, http } from 'msw';

import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { auctionDetailsData } from '../data/auctionDetailsData';

export const productDetailsHandler: HttpHandler = http.get(`${API_END_POINT.AUCTION}/:auctionId`, ({ params }) => {
  const { auctionId } = params;
  return HttpResponse.json(auctionDetailsData[Number(auctionId)]);
});
