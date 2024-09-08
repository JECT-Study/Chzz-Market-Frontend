import JordanBlack from '@/assets/images/jordan_black.jpeg';
import JordanBlue from '@/assets/images/jordan_blue.jpeg';
import JordanRed from '@/assets/images/jordan_red.jpeg';
import { PreRegisterProduct } from 'Product';

export const preRegisterHeartData: PreRegisterProduct[] = [
  {
    id: 0,
    name: '조던 블루',
    img: JordanBlue,
    startPrice: '200,000원',
    likeCount: 30,
  },
  {
    id: 1,
    name: '조던 레드',
    img: JordanRed,
    startPrice: '350,000원',
    likeCount: 12,
  },
  {
    id: 2,
    name: '조던 블랙',
    img: JordanBlack,
    startPrice: '270,000원',
    likeCount: 20,
  },
];
