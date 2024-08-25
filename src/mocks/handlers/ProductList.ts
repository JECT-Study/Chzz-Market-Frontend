import { http, HttpHandler, HttpResponse } from 'msw';
import { API_END_POINT } from '@/constants/api';
import ongoingProducts from '../data/ongoingData';
import upcomingProducts from '../data/upcomingData';

export const getOngoingProductList: HttpHandler = http.get(
  `${API_END_POINT.ONGOING_PRODUCT_LIST}`,
  ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '0';
    const limit = url.searchParams.get('limit') || '10';
    const category = url.searchParams.get('category') || 'fashion';
    const sortType = url.searchParams.get('type') || 'newest';

    // 페이지 크기 설정
    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const start = pageNumber * pageSize;
    const end = start + pageSize;

    const filteredProducts = ongoingProducts.items.filter(
      (item) => item.category === category,
    );

    if (sortType === 'newest') {
      filteredProducts.sort((a, b) => b.timeRemaining - a.timeRemaining);
    } else if (sortType === 'cheap') {
      filteredProducts.sort((a, b) => a.minPrice - b.minPrice);
    } else if (sortType === 'expensive') {
      filteredProducts.sort((a, b) => b.minPrice - a.minPrice);
    } else if (sortType === 'popularity') {
      filteredProducts.sort((a, b) => b.participantCount - a.participantCount);
    }

    const paginatedOngoingProducts = filteredProducts.slice(start, end);

    // 정렬
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
    const page = url.searchParams.get('page') || '0';
    const limit = url.searchParams.get('limit') || '10';
    const category = url.searchParams.get('category') || 'fashion';
    const sortType = url.searchParams.get('type') || 'newest';

    // 페이지 크기 설정
    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const start = pageNumber * pageSize;
    const end = start + pageSize;

    const filteredProducts = upcomingProducts.items.filter(
      (item) => item.category === category,
    );

    const paginatedUpcomingProducts = filteredProducts.slice(start, end);

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
