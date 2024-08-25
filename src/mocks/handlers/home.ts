import { HttpHandler, HttpResponse, http } from 'msw';
import { API_END_POINT } from '@/constants/api';
import {
  bestProducts,
  deadlineProducts,
  preEnrollProducts,
} from '../data/homeProductsData';

export const getBestProductsHandler: HttpHandler = http.get(
  `http://localhost:3000${API_END_POINT.BEST}`,
  () => {
    return HttpResponse.json(bestProducts);
  },
);

export const getDeadLineProductsHandler: HttpHandler = http.get(
  `http://localhost:3000${API_END_POINT.DEADLINE}`,
  () => {
    return HttpResponse.json(deadlineProducts);
  },
);
export const getPreEnrollProductsHandler: HttpHandler = http.get(
  `http://localhost:3000${API_END_POINT.PRE_ENROLL}`,
  () => {
    return HttpResponse.json(preEnrollProducts);
  },
);
