/* eslint-disable import/no-named-as-default */
import { setupWorker } from 'msw/browser';
import { HttpHandler } from 'msw';
import {
  getOngoingProductList,
  getUpcomingProductList,
} from './handlers/ProductList';
import { getMyAuctionPreRegister } from './handlers/myAuctuon';

export const handlers: HttpHandler[] = [
  getUpcomingProductList,
  getOngoingProductList,
  getMyAuctionPreRegister,
];

export const worker = setupWorker(...handlers);
/* eslint-disable import/no-named-as-default */
