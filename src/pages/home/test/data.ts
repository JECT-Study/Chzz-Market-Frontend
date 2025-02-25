import type {
  IAuctionItem,
  IPreAuctionItem
} from '@/entities/auction/types/item';

import adidasImage from '@/shared/assets/test/adidas_superstar.jpeg';
import jordanBlackImage from '@/shared/assets/test/jordan_black.jpeg';
import jordanBlueImage from '@/shared/assets/test/jordan_blue.jpeg';
import jordanRedImage from '@/shared/assets/test/jordan_red.jpeg';
import newBalanceImage from '@/shared/assets/test/newbalance_993.jpeg';

export const bestAuctionsData: IAuctionItem[] = [
  {
    auctionId: 0,
    auctionName: '[나이키] 에어 조던 로우',
    imageUrl: jordanRedImage,
    timeRemaining: 50_400,
    minPrice: 100_000,
    participantCount: 2,
    isParticipated: false,
    isSeller: false
  },
  {
    auctionId: 1,
    auctionName: '[나이키] 조던 블랙',
    imageUrl: jordanBlackImage,
    timeRemaining: 2,
    minPrice: 120_000,
    participantCount: 8,
    isParticipated: true,
    isSeller: false
  },
  {
    auctionId: 2,
    auctionName: '[나이키] 조던 블루',
    imageUrl: jordanBlueImage,
    timeRemaining: 82_800,
    minPrice: 180_000,
    participantCount: 29,
    isParticipated: false,
    isSeller: false
  },
  {
    auctionId: 3,
    auctionName: '[뉴발란스] 993',
    imageUrl: newBalanceImage,
    timeRemaining: 360,
    minPrice: 230_000,
    participantCount: 32,
    isParticipated: true,
    isSeller: false
  },
  {
    auctionId: 4,
    auctionName: '[아디다스] 슈퍼스타',
    imageUrl: adidasImage,
    timeRemaining: 43_200,
    minPrice: 70_000,
    participantCount: 6,
    isParticipated: true,
    isSeller: false
  }
];

export const imminentAuctionsData: IAuctionItem[] = [];

export const preAuctionsData: IPreAuctionItem[] = [
  {
    auctionId: 10,
    auctionName: '[뉴발란스] 993',
    imageUrl: newBalanceImage,
    minPrice: 230_000,
    likeCount: 45,
    isLiked: false,
    isSeller: true
  },
  {
    auctionId: 11,
    auctionName: '[나이키] 조던 블루',
    imageUrl: jordanBlueImage,
    minPrice: 180_000,
    likeCount: 18,
    isLiked: true,
    isSeller: false
  },
  {
    auctionId: 12,
    auctionName: '[나이키] 조던 블랙',
    imageUrl: jordanBlackImage,
    minPrice: 210_000,
    likeCount: 20,
    isLiked: false,
    isSeller: false
  }
];
