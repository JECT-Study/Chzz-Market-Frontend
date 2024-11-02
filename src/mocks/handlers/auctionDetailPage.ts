import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { HttpHandler, HttpResponse, http } from 'msw';
import auctionDetailPageData from '../data/auctionDetailPageData';

const data = [...auctionDetailPageData];

export const auctionDetailPage: HttpHandler = http.get(API_END_POINT.AUCTION_ITEM, ({ params }) => {
  const foundAuction = data.find((auction) => auction.productId === Number(params.auctionId));
  const auctionData = foundAuction || null; // Assign auction to auctionData if found
  return HttpResponse.json({
    auctionData,
    message: 'success',
  });
});
