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

/* eslint-disable import/no-named-as-default */

export const handlers: HttpHandler[] = [
  getBestProductsHandler,
  getDeadLineProductsHandler,
  getPreEnrollProductsHandler,
  getUpcomingProductList,
  getOngoingProductList,
];

export const worker = setupWorker(...handlers);
/* eslint-disable import/no-named-as-default */
