import { HttpHandler } from 'msw';
import { setupWorker } from 'msw/browser';
import { bestAuctionsHandler, imminentAuctionsHandler, preRegisterAuctionsHandler } from '../../mocks/handlers/home';
import { notificationDeleteHandler, notificationReadHandler, notificationsHandler } from '../../mocks/handlers/notification';
import { preRegisterHeartDeleteHandler, preRegisterHeartHandler } from '../../mocks/handlers/preRegisterHeart';

import { bidderListHandler } from '../../mocks/handlers/bidderList';
import getMyAuctionPreRegister from '../../mocks/handlers/myAuctuon';
import postSignup from '../../mocks/handlers/Login';
import { realTimeNotificationsHandler } from '../../mocks/handlers/realTimeNotification';
import { auctionDetailsHandler } from '../../mocks/handlers/auctionDetails';
import { getOngoingProductList } from '../../mocks/handlers/ProductList';

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
