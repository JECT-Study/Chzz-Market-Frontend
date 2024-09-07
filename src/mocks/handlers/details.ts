import { HttpHandler, HttpResponse, http } from 'msw';

import { API_END_POINT } from '@/constants/api';
import { bidProductData } from '../data/bidProductData';

export const bidProductDetailsHandler: HttpHandler = http.get(
  `${API_END_POINT.DETAILS}/:auctionId`,
  ({ params }) => {
    const id = params.id as string;

    const auctionId = parseInt(id, 10);
    return HttpResponse.json(bidProductData[auctionId]);
  },
);
