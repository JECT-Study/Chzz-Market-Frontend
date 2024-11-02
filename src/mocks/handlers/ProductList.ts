import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { http, HttpHandler, HttpResponse } from 'msw';
import ongoingProducts from '../data/ongoingData';

export const getOngoingProductList: HttpHandler = http.get(`${API_END_POINT.AUCTION}`, ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || '0';
  const limit = url.searchParams.get('limit') || '10';
  const category = url.searchParams.get('category') || 'fashion';
  const sortType = url.searchParams.get('type') || 'newest';

  const pageNumber = Number(page);
  const pageSize = Number(limit);

  // 해당 카테고리의 상품 필터링
  let filteredProducts = ongoingProducts.items.filter((item) => item.category === category);

  // 정렬
  if (sortType === 'newest') {
    filteredProducts = filteredProducts.sort((a, b) => b.timeRemaining - a.timeRemaining);
  } else if (sortType === 'cheap') {
    filteredProducts = filteredProducts.sort((a, b) => a.minPrice - b.minPrice);
  } else if (sortType === 'expensive') {
    filteredProducts = filteredProducts.sort((a, b) => b.minPrice - a.minPrice);
  } else if (sortType === 'popularity') {
    filteredProducts = filteredProducts.sort((a, b) => b.participantCount - a.participantCount);
  }

  // 페이지네이션 적용
  const start = pageNumber * pageSize;
  const paginatedOngoingProducts = filteredProducts.slice(start, start + pageSize);

  // 페이지네이션 정보 계산
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const last = pageNumber >= totalPages - 1;

  // 빈 배열일 때의 처리
  if (paginatedOngoingProducts.length === 0 && last) {
    return new HttpResponse(
      JSON.stringify({
        items: paginatedOngoingProducts,
        pageNumber,
        pageSize,
        totalPages,
        totalElements: filteredProducts.length,
        last,
        message: 'No more items available',
      }),
      {
        status: 200,
        statusText: 'OK',
      }
    );
  }

  return new HttpResponse(
    JSON.stringify({
      items: paginatedOngoingProducts,
      pageNumber,
      pageSize,
      totalPages,
      totalElements: filteredProducts.length,
      last,
      message: 'success',
    }),
    {
      status: 200,
      statusText: 'OK',
    }
  );
});

export default { getOngoingProductList };
