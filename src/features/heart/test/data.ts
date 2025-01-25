import type { IPreAuctionItem } from '@/entities';
import jordanBlackImage from '@/shared/assets/test/jordan_black.jpeg';
import jordanBlueImage from '@/shared/assets/test/jordan_blue.jpeg';
import jordanRedImage from '@/shared/assets/test/jordan_red.jpeg';

export const heartData: IPreAuctionItem[] = [
  {
    auctionId: 0,
    auctionName: '조던 블루',
    imageUrl: jordanBlueImage,
    minPrice: 200_000,
    likeCount: 30,
    isLiked: true,
    isSeller: false,
  },
  {
    auctionId: 1,
    auctionName: '조던 레드',
    imageUrl: jordanRedImage,
    minPrice: 350_000,
    likeCount: 12,
    isLiked: true,
    isSeller: false,
  },
  {
    auctionId: 2,
    auctionName: '조던 블랙',
    imageUrl: jordanBlackImage,
    minPrice: 270_000,
    likeCount: 20,
    isLiked: true,
    isSeller: false,
  },
];
