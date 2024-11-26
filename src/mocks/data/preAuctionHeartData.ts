import type { IPreAuctionItem } from '@/entities';
import JordanBlack from '@/shared/assets/test/jordan_black.jpeg';
import JordanBlue from '@/shared/assets/test/jordan_blue.jpeg';
import JordanRed from '@/shared/assets/test/jordan_red.jpeg';

export const preAuctionHeartData: IPreAuctionItem[] = [
  {
    auctionId: 0,
    productName: '조던 블루',
    imageUrl: JordanBlue,
    minPrice: 200_000,
    likeCount: 30,
    isLiked: true,
    isSeller: true,
  },
  {
    auctionId: 1,
    productName: '조던 레드',
    imageUrl: JordanRed,
    minPrice: 350_000,
    likeCount: 12,
    isLiked: true,
    isSeller: true,
  },
  {
    auctionId: 2,
    productName: '조던 블랙',
    imageUrl: JordanBlack,
    minPrice: 270_000,
    likeCount: 20,
    isLiked: true,
    isSeller: true,
  },
];
