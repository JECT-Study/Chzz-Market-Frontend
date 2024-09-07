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
  ADDRESSBOOK: '/addressbook',
  BID: '/bid',
  NOTIFICATION: '/notification',
  FINAL_BIDDER_LIST: '/auctions/:auctionId/final-bidder-list',
});

export default ROUTERS;
