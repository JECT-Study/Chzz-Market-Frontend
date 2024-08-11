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
    AllLIST: '/order/all-list',
  },
  REGISTER: '/register',
  DETAIL: {
    ITEM: '/detail/:id', // 동적 경로 매개변수 설정
  },
});

export default ROUTERS;
