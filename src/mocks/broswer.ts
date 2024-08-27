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
import { getOngoingProductList } from './handlers/ProductList';
import { getMyAuctionPreRegister } from './handlers/myAuctuon';
import { postSignup } from './handlers/Login';

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
