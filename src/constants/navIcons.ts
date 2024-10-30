import HeartOff from '@/assets/icons/heart_off.svg';
import HeartOn from '@/assets/icons/heart_on.svg';
import HomeOff from '@/assets/icons/home_off.svg';
import HomeOn from '@/assets/icons/home_on.svg';
import MyOff from '@/assets/icons/my_off.svg';
import MyOn from '@/assets/icons/my_on.svg';
import NotificationOff from '@/assets/icons/notification_off.svg';
import NotificationOn from '@/assets/icons/notification_on.svg';

export const navIcons: {
  [key in string]: { path: string; title: string; on: string; off: string };
} = Object.freeze({
  home: {
    path: '/',
    title: '치즈 마켓',
    on: HomeOn,
    off: HomeOff,
  },
  notification: {
    path: '/notification',
    title: '알림',
    on: NotificationOn,
    off: NotificationOff,
  },
  heart: {
    path: '/heart',
    title: '내가 찜 한 사전 경매 목록',
    on: HeartOn,
    off: HeartOff,
  },
  user: {
    path: '/user',
    title: '마이페이지',
    on: MyOn,
    off: MyOff,
  },
});
