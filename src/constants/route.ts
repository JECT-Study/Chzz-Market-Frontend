const ROUTERS = Object.freeze({
  HOME: '/',
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
});

export default ROUTERS;
