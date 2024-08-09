/* eslint-disable import/no-named-as-default */
import { setupWorker } from 'msw/browser';
import { HttpHandler } from 'msw';
import {
  getOngoingProductList,
  getUpcomingProductList,
} from './handlers/ProductList';

export const handlers: HttpHandler[] = [
  getUpcomingProductList,
  getOngoingProductList,
];

export const worker = setupWorker(...handlers);
/* eslint-disable import/no-named-as-default */
