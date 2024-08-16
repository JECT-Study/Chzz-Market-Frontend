import { HttpHandler, HttpResponse, http } from 'msw';

import { API_END_POINT } from '@/constants/api';
import { bidProductData } from '../data/bidProductData';

export const getBidProductDetailsHandler: HttpHandler = http.get(
  `http://localhost:3000${API_END_POINT.DETAILS}/1`,
  () => {
    return HttpResponse.json(bidProductData[0]);
  },
);
export const getEditBidProductDetailsHandler: HttpHandler = http.get(
  `http://localhost:3000${API_END_POINT.DETAILS}/2`,
  () => {
    return HttpResponse.json(bidProductData[1]);
  },
);
