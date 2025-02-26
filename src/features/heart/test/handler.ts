import { HttpHandler, HttpResponse, http } from 'msw';

import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { heartData } from './data';

let curHeartData = [...heartData];

export const heartHandler: HttpHandler = http.get(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.HEART_LIST}`,
  async () => {
    return HttpResponse.json({
      items: curHeartData
    });
  }
);

export const heartDeleteHandler: HttpHandler = http.post(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.AUCTION}/:preAuctionId/likes`,
  ({ params }) => {
    const { preAuctionId } = params;
    const heartId = parseInt(preAuctionId as string, 10);

    curHeartData = curHeartData.filter((el) => el.auctionId !== heartId);

    return HttpResponse.json({
      item: curHeartData
    });
  }
);
