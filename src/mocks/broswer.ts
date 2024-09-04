import { HttpHandler } from 'msw';
import { setupWorker } from 'msw/browser';
import {
  bestProductsHandler,
  deadLineProductsHandler,
  preEnrollProductsHandler,
} from './handlers/home';
import {
  bidProductDetailsHandler,
  editBidProductDetailsHandler,
} from './handlers/details';
import {
  notificationDeleteHandler,
  notificationHandler,
} from './handlers/notification';

import { getMyAuctionPreRegister } from './handlers/myAuctuon';
import { getOngoingProductList } from './handlers/ProductList';
import { postSignup } from './handlers/Login';
import { realTimeNotificationHandler } from './handlers/realTimeNotification';

/* eslint-disable import/no-named-as-default */
export const handlers: HttpHandler[] = [
  bestProductsHandler,
  deadLineProductsHandler,
  preEnrollProductsHandler,
  getOngoingProductList,
  getMyAuctionPreRegister,
  postSignup,
  bidProductDetailsHandler,
  editBidProductDetailsHandler,
  realTimeNotificationHandler,
  notificationHandler,
  notificationDeleteHandler,
];

export const worker = setupWorker(...handlers);
/* eslint-disable import/no-named-as-default */
