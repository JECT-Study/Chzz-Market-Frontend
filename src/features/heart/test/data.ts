import type { IPreAuctionItem } from '@/entities';
import jordanBlueImage from '@/shared/assets/test/jordan_blue.jpeg';

export const heartData: IPreAuctionItem[] = [
  {
    auctionId: 11,
    auctionName: '조던 블루',
    imageUrl: jordanBlueImage,
    minPrice: 180_000,
    likeCount: 18,
    isLiked: true,
    isSeller: false
  }
];
