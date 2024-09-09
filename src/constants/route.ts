const ROUTERS = Object.freeze({
  HOME: '/',
  HEART: '/heart',
  SIGNUP: '/signup',
  LOGIN: '/login',
  USER: '/user',
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
