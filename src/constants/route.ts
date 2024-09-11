const ROUTERS = Object.freeze({
  HOME: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  USER: '/user',
  PROFILE: {
    EDIT: 'user/profile/edit',
  },
  PRODUCT: {
    LIST: '/product/list',
  },
  REGISTERED: {
    LIST: 'user/registered/list',
  },
  ORDER: {
    HISTORY: '/order/history',
  },
  REGISTER: '/register',
  DETAIL: {
    ITEM: '/detail/:id',
  },
  ADDRESSBOOK: '/addressbook',
  BID: '/bid',
});

export default ROUTERS;
