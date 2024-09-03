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
  // Test
  TEST: '/test',
  BEST: '/products/best',
  DEADLINE: '/products/deadline',
  PRE_ENROLL: '/products/pre_enroll',
  DETAILS: '/auctions',
};
