import { HttpHandler, HttpResponse, http } from 'msw';

import { API_END_POINT } from '@/shared/constants/apiEndPoint';

export const patchPreAuctionHandler: HttpHandler = http.patch(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.AUCTION}/:preAuctionId`,
  ({ params }) => {
    const { preAuctionId } = params;

    return HttpResponse.json({ auctionId: preAuctionId });
  }
);
