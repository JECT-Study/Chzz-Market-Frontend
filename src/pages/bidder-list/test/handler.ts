import { HttpHandler, HttpResponse, http } from 'msw';

import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { bidderListData } from './data';

export const bidderListHandler: HttpHandler = http.get(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.AUCTION}/:auctionId/bids`,
  async () => {
    return HttpResponse.json({
      items: bidderListData
    });
  }
);
