import { HttpHandler, HttpResponse, http } from 'msw';
import { API_END_POINT } from '@/constants/api';
import {
  bestProducts,
  imminentProducts,
  preRegisterProducts,
} from '../data/homeProductsData';

export const bestProductsHandler: HttpHandler = http.get(
  `${API_END_POINT.BEST}`,
  () => {
    return HttpResponse.json(bestProducts);
  },
);

export const imminentProductsHandler: HttpHandler = http.get(
  `${API_END_POINT.IMMINENT}`,
  () => {
    return HttpResponse.json(imminentProducts);
  },
);
export const preRegisterProductsHandler: HttpHandler = http.get(
  `${API_END_POINT.PRE_REGISTER}`,
  () => {
    return HttpResponse.json(preRegisterProducts);
  },
);
