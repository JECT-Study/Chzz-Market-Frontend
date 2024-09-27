import { HttpHandler } from 'msw';
import { setupWorker } from 'msw/browser';
import {
  bestAuctionsHandler,
  imminentAuctionsHandler,
  preRegisterAuctionsHandler,
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
import postSignup from './handlers/Login';
import { realTimeNotificationsHandler } from './handlers/realTimeNotification';
import { auctionDetailsHandler } from './handlers/auctionDetails';
import { getOngoingProductList } from './handlers/ProductList';

/* eslint-disable import/no-named-as-default */
export const handlers: HttpHandler[] = [
  bestAuctionsHandler,
  imminentAuctionsHandler,
  preRegisterAuctionsHandler,
  getOngoingProductList,
  getMyAuctionPreRegister,
  postSignup,
  auctionDetailsHandler,
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
