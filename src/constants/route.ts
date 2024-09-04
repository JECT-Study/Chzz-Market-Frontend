const ROUTERS = Object.freeze({
  HOME: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  MYPAGE: '/mypage',
  PROFILE: {
    EDIT: '/profile/edit',
  },
  PRODUCT: {
    LIST: '/product/list',
  },
  ORDER: {
    HISTORY: '/order/history',
    MYORDERLIST: '/order/myOrderList',
  },
  REGISTER: '/register',
  DETAIL: {
    ITEM: '/detail/:id',
  },
  BID: '/bid',
  NOTIFICATION: '/notification',
  BIDDER_LIST: '/auction/bidder-list',
});

export default ROUTERS;
