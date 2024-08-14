import { API_END_POINT } from '@/constants/api';
import { HttpHandler, HttpResponse, http } from 'msw';
import { bestProducts } from '../data/homeProductsData';

export const getProductDetailsHandler: HttpHandler = http.get(
  `http://localhost:3000${API_END_POINT.DETAILS}/1`,
  () => {
    return HttpResponse.json(bestProducts[0]);
  },
);
