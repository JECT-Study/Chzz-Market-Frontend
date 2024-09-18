import { HttpHandler } from 'msw';
import { setupWorker } from 'msw/browser';
import {
  bestProductsHandler,
  imminentProductsHandler,
  preRegisterProductsHandler,
} from './handlers/home';
import {
  notificationDeleteHandler,
  notificationReadHandler,
  notificationsHandler,
} from './handlers/notification';
import {
  preRegisterHeartDeleteHandler,
  preRegisterHeartHandler,
} from './handlers/preRegisterHeart';

import { bidderListHandler } from './handlers/bidderList';
import getMyAuctionPreRegister from './handlers/myAuctuon';
import { getOngoingProductList } from './handlers/productList';
import postSignup from './handlers/Login';
import { productDetailsHandler } from './handlers/productDetails';
import { realTimeNotificationsHandler } from './handlers/realTimeNotification';

/* eslint-disable import/no-named-as-default */
export const handlers: HttpHandler[] = [
  bestProductsHandler,
  imminentProductsHandler,
  preRegisterProductsHandler,
  getOngoingProductList,
  getMyAuctionPreRegister,
  postSignup,
  productDetailsHandler,
  realTimeNotificationsHandler,
  notificationsHandler,
  notificationReadHandler,
  notificationDeleteHandler,
  preRegisterHeartHandler,
  preRegisterHeartDeleteHandler,
  bidderListHandler,
];

export const worker = setupWorker(...handlers);
/* eslint-disable import/no-named-as-default */
