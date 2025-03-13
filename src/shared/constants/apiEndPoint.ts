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