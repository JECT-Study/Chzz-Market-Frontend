import { http, HttpHandler, HttpResponse } from 'msw';
import { API_END_POINT } from '@/constants/api';
import ongoingProducts from '../data/ongoingData';
import upcomingProducts from '../data/upcomingData';

export const getOngoingProductList: HttpHandler = http.get(
  `${API_END_POINT.ONGOING_PRODUCT_LIST}`,
  ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '10';
    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    const paginatedOngoingProducts = ongoingProducts.items.slice(start, end);

    return new HttpResponse(
      JSON.stringify({
        items: paginatedOngoingProducts,
        pageNumber,
        pageSize,
        totalPages: Math.ceil(ongoingProducts.items.length / pageSize),
        totalElements: ongoingProducts.items.length,
        last: end >= ongoingProducts.items.length,
        message: 'success',
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

export const getUpcomingProductList: HttpHandler = http.get(
  `${API_END_POINT.UPCOMING_PRODUCT_LIST}`,
  ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '10';
    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    const paginatedUpcomingProducts = upcomingProducts.items.slice(start, end);

    return new HttpResponse(
      JSON.stringify({
        items: paginatedUpcomingProducts,
        pageNumber,
        pageSize,
        totalPages: Math.ceil(upcomingProducts.items.length / pageSize),
        totalElements: upcomingProducts.items.length,
        last: end >= upcomingProducts.items.length,
        message: 'success',
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

export default { getOngoingProductList, getUpcomingProductList };
