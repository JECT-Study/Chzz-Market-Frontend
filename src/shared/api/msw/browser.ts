import {
  kakaoLoginHandler,
  naverLoginHandler,
  postSignupHandler
} from '@/features/auth/test/handler';
import {
  auctionDetailsHandler,
  cancelBidHandler,
  convertPreAuctionHandler,
  deletePreAuctionHandler,
  heartAuctionHandler,
  postBidHandler
} from '@/features/details';
import { heartDeleteHandler, heartHandler } from '@/features/heart';
import {
  notificationDeleteHandler,
  notificationListHandler,
  notificationReadHandler,
  realTimeNotificationsHandler
} from '@/features/notification';
import {
  getAuctionUploadURLsHandler,
  postAuctionHandler,
  uploadImagesToS3Handler
} from '@/features/register';

import { patchPreAuctionHandler } from '@/features/edit-auction';
import { getOngoingProductListHandler } from '@/features/product-list';
import {
  deleteUserHandler,
  getMyAuctionPreRegisterHandler,
  getUserProfileHandler,
  logoutHandler,
  refreshTokenHandler
} from '@/features/user';
import { bidderListHandler } from '@/pages/bidder-list';
import { homeAuctionsHandler } from '@/pages/home';
import { HttpHandler } from 'msw';
import { setupWorker } from 'msw/browser';

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
  bidderListHandler,
  postAuctionHandler,
  patchPreAuctionHandler,
  getAuctionUploadURLsHandler,
  uploadImagesToS3Handler,
  deletePreAuctionHandler,
  convertPreAuctionHandler,
  heartAuctionHandler,
  cancelBidHandler,
  postBidHandler
];

export const worker = setupWorker(...handlers);
/* eslint-disable import/no-named-as-default */
