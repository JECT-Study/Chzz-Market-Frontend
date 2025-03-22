const PRE_FIX = '/api/v1';

export const API_END_POINT = {
  // AUTH
  LOGIN: {
    KAKAO: '/auth/kakao',
    NAVER: '/auth/naver'
  },
  LOGOUT: `${PRE_FIX}/users/logout`,
  NICKNAME_CHECK: `${PRE_FIX}/users/check/nickname`,
  REFRESH_TOKEN: `${PRE_FIX}/users/tokens/reissue`,
  SIGNUP: `${PRE_FIX}/users`,
  PROFILE: `${PRE_FIX}/users/profile`,
  PROFILE_IMAGE_UPLOAD_URL: `${PRE_FIX}/image/profile`,
  CUSTOMER_KEY: `${PRE_FIX}/users/customer-key`,
  ORDER_LIST: '/order/list',
  MY_AUCTION_PRE_REGISTER: `/product/list/api/v1/users/me/auctions`,

  BEST: `${PRE_FIX}/auctions?status=proceeding&size=5&sort=popularity,newest`,
  IMMINENT: `${PRE_FIX}/auctions?status=proceeding&minutes=60&size=5&sort=immediately,popularity`,
  PRE_AUCTION: `${PRE_FIX}/auctions?status=pre&size=5&sort=likes,newest`,
  AUCTION: `${PRE_FIX}/auctions`,
  SEARCH: `${PRE_FIX}/auctions/search`,

  HEART_LIST: `${PRE_FIX}/auctions/users/likes`,
  NOTIFICATION_LIST: `${PRE_FIX}/notifications`,
  ADDRESS: `${PRE_FIX}/addresses`,
  REALTIME_NOTIFICATIONS: `${PRE_FIX}/notifications/subscribe`,

  USER_ONGOING_AUCTION_REGISTERED: `${PRE_FIX}/auctions/users/proceeding`,
  USER_END_AUCTION_REGISTERED: `${PRE_FIX}/auctions/users/ended`,
  USER_PRE_AUCTION_REGISTERED: `${PRE_FIX}/auctions/products/users`,

  BID: `${PRE_FIX}/bids`,
  PAYMENT: `${PRE_FIX}/payments/approval`,
  CREATE_ORDERID: `${PRE_FIX}/payments/order-id`,

  AUCTION_IMAGE_UPLOAD_URL: `${PRE_FIX}/image/auction`
};

// 1.	사용자 인증이 필요한 API
// 2.	입찰 & 경매 관련 API
// 3.	결제 관련 API
// 4.	알림 관련 API

export const NEED_LOGIN_API_LIST = [
  "/api/v1/addresses",
  "/api/v1/auctions/{auctionId}/won",
  "/api/v1/auctions/{auctionId}/bids",
  "/api/v1/auctions/users/won",
  "/api/v1/auctions/users/proceeding",
  "/api/v1/auctions/users/pre",
  "/api/v1/auctions/users/lost",
  "/api/v1/auctions/users/likes",
  "/api/v1/auctions/users/ended",
  "/api/v1/auctions/{auctionId}/likes",
  "/api/v1/bids",
  "/api/v1/bids/{bidId}/cancel",
  "/api/v1/image/profile",
  "/api/v1/image/auction",
  "/api/v1/notifications",
  "/api/v1/notifications/subscribe",
  "/api/v1/notifications/{notificationId}/read",
  "/api/v1/payments/order-id",
  "/api/v1/payments/approval",
  "/api/v1/users",
  "/api/v1/users/customer-key",
  "/api/v1/users/check/nickname/{nickname}",
  "/api/v1/users/tokens/reissue",
  "/api/v1/users/profile",
  "/api/v1/users/logout",
  "/api/v1/users",
];