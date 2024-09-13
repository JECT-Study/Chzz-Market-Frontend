export const API_END_POINT = {
  // AUTH
  LOGIN: {
    KAKAO: '/auth/kakao',
    NAVER: '/auth/naver',
  },
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/token',
  SIGNUP: 'api/v1/users',
  PROFILE: '/profile',
  ORDER_LIST: '/order/list',
  ONGOING_PRODUCT_LIST: '/product_list/api/v1/auctions',
  UPCOMING_PRODUCT_LIST: '/product_list/api/v1/auctions',
  MY_ACUTION_PRE_REGISTER: '/product/list/api/v1/users/me/auctions',
  BEST: '/api/v1/auctions/best',
  IMMINENT: '/api/v1/auctions/imminent',
  PRE_REGISTER: '/api/v1/auctions/pre-register',
  AUCTIONS: '/api/v1/auctions',
  NOTIFICATIONS: '/api/v1/notifications',
  REALTIME_NOTIFICATIONS: '/api/v1/notifications/subscribe',
  PRE_REGISTERED_HEART: '/api/v1/auctions/pre-registered/heart',
};
