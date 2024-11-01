import { HttpHandler, HttpResponse, http } from 'msw';

import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { bidderListData } from '../data/bidderListData';

let data = [...bidderListData];

export const bidderListHandler: HttpHandler = http.get(`${API_END_POINT.AUCTION}/:auctionId/bids`, ({ request }) => {
  const url = new URL(request.url);
  const sort = url.searchParams.get('sort');

  data = sort === 'amount,desc' ? data.sort((a, b) => b.bidAmount - a.bidAmount) : data.sort((a, b) => a.bidAmount - b.bidAmount);

  return HttpResponse.json(data);
});
