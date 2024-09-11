export const API_END_POINT = {
  // AUTH
  LOGIN: {
    KAKAO: '/auth/kakao',
    NAVER: '/auth/naver',
  },
  LOGOUT: '/api/v1/users/logout',
  REFRESH_TOKEN: '/api/v1/users/tokens/reissue',
  SIGNUP: 'api/v1/users',
  PROFILE: 'api/v1/users',
  ORDER_LIST: '/order/list',
  ONGOING_PRODUCT_LIST: 'api/v1/auctions',
  PRE_ENROLL_PRODUCT_LIST: 'api/v1/products',
  MY_ACUTION_ONGOING_REGISTER: 'api/v1/auctions/users',
  MY_ACUTION_PRE_ENROLL_REGISTER: 'api/v1/products/users',
  // Test
  TEST: '/test',
  BEST: '/products/best',
  DEADLINE: '/products/deadline',
  PRE_ENROLL: '/products/pre_enroll',
  DETAILS: '/auctions',
};
