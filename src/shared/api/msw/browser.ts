import { heartDeleteHandler, heartHandler } from '@/features/heart';
import { notificationDeleteHandler, notificationListHandler, notificationReadHandler, realTimeNotificationsHandler } from '@/features/notification';
import { bestAuctionsHandler, imminentAuctionsHandler, preAuctionsHandler } from '@/pages/home';

import postSignup from '@/mocks/handlers/Login';
import { getOngoingProductList } from '@/mocks/handlers/ProductList';
import { auctionDetailsHandler } from '@/mocks/handlers/auctionDetails';
import { bidderListHandler } from '@/mocks/handlers/bidderList';
import getMyAuctionPreRegister from '@/mocks/handlers/myAuctuon';
import { HttpHandler } from 'msw';
import { setupWorker } from 'msw/browser';

/* eslint-disable import/no-named-as-default */
const handlers: HttpHandler[] = [
  bestAuctionsHandler,
  imminentAuctionsHandler,
  preAuctionsHandler,
  getOngoingProductList,
  getMyAuctionPreRegister,
  postSignup,
  auctionDetailsHandler,
  realTimeNotificationsHandler,
  notificationListHandler,
  notificationReadHandler,
  notificationDeleteHandler,
  heartHandler,
  heartDeleteHandler,
  bidderListHandler,
];

export const worker = setupWorker(...handlers);
/* eslint-disable import/no-named-as-default */
