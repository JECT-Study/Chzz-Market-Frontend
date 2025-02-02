import {
  auctionDetailsHandler,
  convertPreAuctionHandler,
  deletePreAuctionHandler,
  heartAuctionHandler
} from '@/features/details';
import {
  getAuctionUploadURLsHandler,
  postAuctionHandler,
  uploadImagesToS3Handler
} from '@/features/register';
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
import { bidderListHandler } from '@/pages/bidder-list';
import { getMyAuctionPreRegisterHandler } from '@/features/user';
import { getOngoingProductListHandler } from '@/features/product-list';
import { homeAuctionsHandler } from '@/pages/home';
import { patchPreAuctionHandler } from '@/features/edit-auction';
import { setupWorker } from 'msw/browser';

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
  bidderListHandler,
  postAuctionHandler,
  patchPreAuctionHandler,
  getAuctionUploadURLsHandler,
  uploadImagesToS3Handler,
  deletePreAuctionHandler,
  convertPreAuctionHandler,
  heartAuctionHandler
];

export const worker = setupWorker(...handlers);
/* eslint-disable import/no-named-as-default */
