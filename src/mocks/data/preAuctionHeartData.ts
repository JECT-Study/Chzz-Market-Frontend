import { IPreAuctionItem } from '@/@types/AuctionItem';
import JordanBlack from '@/shared/assets/images/jordan_black.jpeg';
import JordanBlue from '@/shared/assets/images/jordan_blue.jpeg';
import JordanRed from '@/shared/assets/images/jordan_red.jpeg';

export const preAuctionHeartData: IPreAuctionItem[] = [
  {
    productId: 0,
    productName: '조던 블루',
    imageUrl: JordanBlue,
    minPrice: 200_000,
    likeCount: 30,
    isLiked: true,
  },
  {
    productId: 1,
    productName: '조던 레드',
    imageUrl: JordanRed,
    minPrice: 350_000,
    likeCount: 12,
    isLiked: true,
  },
  {
    productId: 2,
    productName: '조던 블랙',
    imageUrl: JordanBlack,
    minPrice: 270_000,
    likeCount: 20,
    isLiked: true,
  },
];
