import JordanBlack from '@/assets/images/jordan_black.jpeg';
import JordanBlue from '@/assets/images/jordan_blue.jpeg';
import JordanRed from '@/assets/images/jordan_red.jpeg';
import { PreRegisterAuction } from 'Auction';

export const preRegisterHeartData: PreRegisterAuction[] = [
  {
    id: 0,
    name: '조던 블루',
    cdnPath: JordanBlue,
    minPrice: 200_000,
    likeCount: 30,
  },
  {
    id: 1,
    name: '조던 레드',
    cdnPath: JordanRed,
    minPrice: 350_000,
    likeCount: 12,
  },
  {
    id: 2,
    name: '조던 블랙',
    cdnPath: JordanBlack,
    minPrice: 270_000,
    likeCount: 20,
  },
];
