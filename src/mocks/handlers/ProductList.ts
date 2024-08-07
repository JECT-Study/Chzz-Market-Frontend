import { http, HttpHandler, HttpResponse } from 'msw';
import { API_END_POINT } from '@/constants/api';
import ongoingProducts from '../data/ongoingData';
import upcomingProducts from '../data/upcomingData';

export const getOngoingProductList: HttpHandler = http.get(
  `${API_END_POINT.ONGOING_PRODUCT_LIST}`,
  () => {
    return HttpResponse.json(ongoingProducts, { status: 200 });
  },
);

export const getUpcomingProductList: HttpHandler = http.get(
  `${API_END_POINT.UPCOMING_PRODUCT_LIST}`,
  () => {
    return HttpResponse.json(upcomingProducts, { status: 200 });
  },
);

export default { getOngoingProductList, getUpcomingProductList };
