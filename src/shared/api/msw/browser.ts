import { heartDeleteHandler, heartHandler } from '@/features/heart';
import {
  notificationDeleteHandler,
  notificationListHandler,
  notificationReadHandler,
  realTimeNotificationsHandler
} from '@/features/notification';

import { HttpHandler } from 'msw';
import { auctionDetailsHandler } from '@/features/details';
import { bidderListHandler } from '@/pages/bidder-list';
import { getMyAuctionPreRegisterHandler } from '@/features/user';
import { getOngoingProductListHandler } from '@/features/product-list';
import { homeAuctionsHandler } from '@/pages/home';
import { setupWorker } from 'msw/browser';
import { bidderListHandler } from '@/pages/bidder-list';
import { getOngoingProductListHandler } from '@/features/product-list/test';
import { getMyAuctionPreRegisterHandler } from '@/features/user/test';
import {
  kakaoLoginHandler,
  naverLoginHandler,
  postSignupHandler
} from '@/features/auth/test';

/* eslint-disable import/no-named-as-default */
const handlers: HttpHandler[] = [
  homeAuctionsHandler,
  getOngoingProductListHandler,
  getMyAuctionPreRegisterHandler,
  postSignupHandler,
  kakaoLoginHandler,
  naverLoginHandler,
  realTimeNotificationsHandler,
  notificationListHandler,
  notificationReadHandler,
  notificationDeleteHandler,
  heartHandler,
  heartDeleteHandler,
  auctionDetailsHandler,
  bidderListHandler
];

export const worker = setupWorker(...handlers);
/* eslint-disable import/no-named-as-default */
