import { HttpHandler } from 'msw';
import { setupWorker } from 'msw/browser';
import {
  bestProductsHandler,
  imminentProductsHandler,
  preRegisterProductsHandler,
} from './handlers/home';
import {
  notificationDeleteHandler,
  notificationsHandler,
} from './handlers/notification';
import {
  preRegisterHeartDeleteHandler,
  preRegisterHeartHandler,
} from './handlers/preRegisterHeart';

import { bidProductDetailsHandler } from './handlers/bidProductDetails';
import getMyAuctionPreRegister from './handlers/myAuctuon';
import { getOngoingProductList } from './handlers/ProductList';
import postSignup from './handlers/Login';
import { realTimeNotificationsHandler } from './handlers/realTimeNotification';

/* eslint-disable import/no-named-as-default */
export const handlers: HttpHandler[] = [
  bestProductsHandler,
  imminentProductsHandler,
  preRegisterProductsHandler,
  getOngoingProductList,
  getMyAuctionPreRegister,
  postSignup,
  bidProductDetailsHandler,
  realTimeNotificationsHandler,
  notificationsHandler,
  notificationDeleteHandler,
  preRegisterHeartHandler,
  preRegisterHeartDeleteHandler,
];

export const worker = setupWorker(...handlers);
/* eslint-disable import/no-named-as-default */
