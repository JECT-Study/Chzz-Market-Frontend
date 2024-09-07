import { HttpHandler, HttpResponse, http } from 'msw';

import { API_END_POINT } from '@/constants/api';
import { bidProductData } from '../data/bidProductData';

export const bidProductDetailsHandler: HttpHandler = http.get(
  `${API_END_POINT.DETAILS}/:auctionId`,
  ({ params }) => {
    const { auctionId } = params;
    return HttpResponse.json(bidProductData[Number(auctionId)]);
  },
);
