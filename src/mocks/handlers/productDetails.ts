import { HttpHandler, HttpResponse, http } from 'msw';

import { API_END_POINT } from '@/constants/api';
import { productDetailsData } from '../data/productDetailsData';

export const productDetailsHandler: HttpHandler = http.get(
  `${API_END_POINT.DETAILS}/:auctionId`,
  ({ params }) => {
    const { auctionId } = params;
    return HttpResponse.json(productDetailsData[Number(auctionId)]);
  },
);
