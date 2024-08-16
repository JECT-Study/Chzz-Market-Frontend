import { HttpHandler } from 'msw';
import { setupWorker } from 'msw/browser';
import {
  getBestProductsHandler,
  getDeadLineProductsHandler,
  getPreEnrollProductsHandler,
} from './handlers/home';
import {
  getBidProductDetailsHandler,
  getEditBidProductDetailsHandler,
} from './handlers/details';
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
  getBidProductDetailsHandler,
  getEditBidProductDetailsHandler,
];

export const worker = setupWorker(...handlers);
/* eslint-disable import/no-named-as-default */
