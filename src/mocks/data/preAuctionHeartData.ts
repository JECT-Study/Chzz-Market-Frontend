import { IPreAuctionItem } from 'AuctionItem';
import JordanBlack from '@/assets/images/jordan_black.jpeg';
import JordanBlue from '@/assets/images/jordan_blue.jpeg';
import JordanRed from '@/assets/images/jordan_red.jpeg';

export const preAuctionHeartData: IPreAuctionItem[] = [
  {
    productId: 0,
    productName: '조던 블루',
    imgUrl: JordanBlue,
    minPrice: 200_000,
    likeCount: 30,
    isLiked: true,
  },
  {
    productId: 1,
    productName: '조던 레드',
    imgUrl: JordanRed,
    minPrice: 350_000,
    likeCount: 12,
    isLiked: true,
  },
  {
    productId: 2,
    productName: '조던 블랙',
    imgUrl: JordanBlack,
    minPrice: 270_000,
    likeCount: 20,
    isLiked: true,
  },
];
