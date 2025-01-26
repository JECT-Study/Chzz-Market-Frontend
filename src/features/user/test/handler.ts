import { HttpHandler, HttpResponse, http } from 'msw';

import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import myAuctionData from './auctionData';

export const getMyAuctionPreRegisterHandler: HttpHandler = http.get(`${API_END_POINT.MY_AUCTION_PRE_REGISTER}`, ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || '0';
  const size = url.searchParams.get('size') || '5';

  const startIndex = Number(page) * Number(size);
  const endIndex = startIndex + Number(size);
  const paginatedContent = myAuctionData.content.slice(startIndex, endIndex);

  return new HttpResponse(
    JSON.stringify({
      ...myAuctionData,
      content: paginatedContent,
      pageable: {
        ...myAuctionData.pageable,
        pageNumber: Number(page),
        pageSize: Number(size),
      },
      last: page === (myAuctionData.totalPages - 1).toString(),
      numberOfElements: paginatedContent.length,
    }),
    {
      status: 200,
      statusText: 'OK',
    }
  );
});

export default getMyAuctionPreRegisterHandler;