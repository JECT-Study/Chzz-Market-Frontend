export const NAV_ICONS: {
  [key in string]: { path: string; title: string; on: string; off: string };
} = Object.freeze({
  home: {
    path: '/',
    title: '치즈 마켓',
    on: 'home_on',
    off: 'home_off'
  },
  notification: {
    path: '/notification',
    title: '알림',
    on: 'notification_on',
    off: 'notification_off'
  },
  heart: {
    path: '/heart',
    title: '내가 찜 한 사전 경매 목록',
    on: 'heart_on',
    off: 'heart_off'
  },
  user: {
    path: '/user',
    title: '마이페이지',
    on: 'my_on',
    off: 'my_off'
  }
});
