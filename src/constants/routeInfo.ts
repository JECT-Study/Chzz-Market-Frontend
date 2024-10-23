export const ROUTE_INFO: {
  [key: string]: { title: string; active: string };
} = Object.freeze({
  '/': {
    title: '치즈 마켓',
    active: 'home',
  },
  '/heart': {
    title: '좋아요 한 사전 경매 목록',
    active: 'heart',
  },
  '/notification': {
    title: '알림',
    active: 'notification',
  },
  '/user': {
    title: '마이페이지',
    active: 'user',
  },
  '/user/list/participated': {
    title: '참여한 정식 경매 내역',
    active: 'user',
  },
  '/user/list/registered': {
    title: '내가 등록한 경매 내역',
    active: 'user',
  },
  '/user/list/pre-registered': {
    title: '내가 등록한 사전경매 내역',
    active: 'user',
  },
});
