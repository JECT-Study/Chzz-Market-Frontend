import { heartDeleteHandler, heartHandler } from '@/features/heart';
import { notificationDeleteHandler, notificationListHandler, notificationReadHandler, realTimeNotificationsHandler } from '@/features/notification';

import { auctionDetailsHandler } from '@/features/details';
import postSignup from '@/mocks/handlers/Login';
import { getOngoingProductList } from '@/mocks/handlers/ProductList';
import { bidderListHandler } from '@/mocks/handlers/bidderList';
import getMyAuctionPreRegister from '@/mocks/handlers/myAuctuon';
import { homeAuctionsHandler } from '@/pages/home';
import { HttpHandler } from 'msw';
import { setupWorker } from 'msw/browser';

/* eslint-disable import/no-named-as-default */
const handlers: HttpHandler[] = [
  homeAuctionsHandler,
  getOngoingProductList,
  getMyAuctionPreRegister,
  postSignup,
  realTimeNotificationsHandler,
  notificationListHandler,
  notificationReadHandler,
  notificationDeleteHandler,
  heartHandler,
  heartDeleteHandler,
  bidderListHandler,
  auctionDetailsHandler,
];

export const worker = setupWorker(...handlers);
/* eslint-disable import/no-named-as-default */
