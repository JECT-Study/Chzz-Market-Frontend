import { HttpHandler } from 'msw';
import { setupWorker } from 'msw/browser';
import {
  getBestProductsHandler,
  getDeadLineProductsHandler,
  getPreEnrollProductsHandler,
} from './handlers/home';
import { getOngoingProductList } from './handlers/productList';
import getMyAuctionPreRegister from './handlers/myAuctuon';
import postSignup from './handlers/Login';
import {
  getBidProductDetailsHandler,
  getEditBidProductDetailsHandler,
} from './handlers/details';

/* eslint-disable import/no-named-as-default */
export const handlers: HttpHandler[] = [
  getBestProductsHandler,
  getDeadLineProductsHandler,
  getPreEnrollProductsHandler,
  getOngoingProductList,
  getMyAuctionPreRegister,
  postSignup,
  getBidProductDetailsHandler,
  getEditBidProductDetailsHandler,
];

export const worker = setupWorker(...handlers);
/* eslint-disable import/no-named-as-default */
