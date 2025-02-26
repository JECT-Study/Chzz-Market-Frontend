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
} from '@/features/details/test/handler';
import {
  heartDeleteHandler,
  heartHandler
} from '@/features/heart/test/handler';
import {
  notificationDeleteHandler,
  notificationListHandler,
  notificationReadHandler,
  realTimeNotificationsHandler
} from '@/features/notification/test/handler';
import {
  getAuctionUploadURLsHandler,
  postAuctionHandler,
  uploadImagesToS3Handler
} from '@/features/register/test/handler';

import { patchPreAuctionHandler } from '@/features/edit-auction/test/handler';
import { getOngoingProductListHandler } from '@/features/product-list';
import {
  deleteUserHandler,
  getMyAuctionPreRegisterHandler,
  getUserProfileHandler,
  logoutHandler,
  refreshTokenHandler
} from '@/features/user';
import { bidderListHandler } from '@/pages/bidder-list/test/handler';
import { homeAuctionsHandler } from '@/pages/home/test/handler';
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
