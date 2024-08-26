import HeartOff from '@/assets/icons/heart_off.svg';
import HeartOn from '@/assets/icons/heart_on.svg';
import HomeOff from '@/assets/icons/home_off.svg';
import HomeOn from '@/assets/icons/home_on.svg';
import MyOff from '@/assets/icons/my_off.svg';
import MyOn from '@/assets/icons/my_on.svg';
import NotificationOff from '@/assets/icons/notification_off.svg';
import NotificationOn from '@/assets/icons/notification_on.svg';

export const navIcons: {
  [key in string]: { path: string; on: string; off: string };
} = Object.freeze({
  home: {
    path: '/',
    on: HomeOn,
    off: HomeOff,
  },
  notification: {
    path: '/notification',
    on: NotificationOn,
    off: NotificationOff,
  },
  heart: {
    path: '/heart',
    on: HeartOn,
    off: HeartOff,
  },
  my: {
    path: '/mypage',
    on: MyOn,
    off: MyOff,
  },
});
