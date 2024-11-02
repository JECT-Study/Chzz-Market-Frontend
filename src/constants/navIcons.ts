import HeartOff from '@/shared/assets/icons/heart_off.svg';
import HeartOn from '@/shared/assets/icons/heart_on.svg';
import HomeOff from '@/shared/assets/icons/home_off.svg';
import HomeOn from '@/shared/assets/icons/home_on.svg';
import MyOff from '@/shared/assets/icons/my_off.svg';
import MyOn from '@/shared/assets/icons/my_on.svg';
import NotificationOff from '@/shared/assets/icons/notification_off.svg';
import NotificationOn from '@/shared/assets/icons/notification_on.svg';

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
