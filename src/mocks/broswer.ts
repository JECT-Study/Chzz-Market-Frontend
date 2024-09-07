import { HttpHandler } from 'msw';
import { setupWorker } from 'msw/browser';
import {
  bestProductsHandler,
  imminentProductsHandler,
  preRegisterProductsHandler,
} from './handlers/home';
import getMyAuctionPreRegister from './handlers/myAuctuon';
import postSignup from './handlers/Login';
import { bidProductDetailsHandler } from './handlers/bidProductDetails';
import {
  notificationDeleteHandler,
  notificationsHandler,
} from './handlers/notification';
import { realTimeNotificationsHandler } from './handlers/realTimeNotification';
import { getOngoingProductList } from './handlers/ProductList';

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
];

export const worker = setupWorker(...handlers);
/* eslint-disable import/no-named-as-default */
