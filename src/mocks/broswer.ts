import { HttpHandler } from 'msw';
import { setupWorker } from 'msw/browser';
import {
  getBestProductsHandler,
  getDeadLineProductsHandler,
  getPreEnrollProductsHandler,
} from './handlers/home';
import {
  getOngoingProductList,
  getUpcomingProductList,
} from './handlers/ProductList';
import { getProductDetailsHandler } from './handlers/details';

/* eslint-disable import/no-named-as-default */

export const handlers: HttpHandler[] = [
  getBestProductsHandler,
  getDeadLineProductsHandler,
  getPreEnrollProductsHandler,
  getUpcomingProductList,
  getOngoingProductList,
  getProductDetailsHandler,
];

export const worker = setupWorker(...handlers);
/* eslint-disable import/no-named-as-default */
