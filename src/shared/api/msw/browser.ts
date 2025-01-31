import { heartDeleteHandler, heartHandler } from '@/features/heart';
import {
  kakaoLoginHandler,
  naverLoginHandler,
  postSignupHandler
} from '@/features/auth';
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
import { deleteUserHandler, getUserProfileHandler, logoutHandler, refreshTokenHandler } from '@/features/user/test/handler';

/* eslint-disable import/no-named-as-default */
const handlers: HttpHandler[] = [
  homeAuctionsHandler,
  getOngoingProductListHandler,
  getMyAuctionPreRegisterHandler,
  refreshTokenHandler,
  getUserProfileHandler,
  logoutHandler,
  deleteUserHandler,
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
