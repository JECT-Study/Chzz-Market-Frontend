import { IAuctionItem, IPreAuctionItem } from '@/@types/AuctionItem';

import adidasImage from '@/shared/assets/images/adidas_superstar.jpeg';
import jordanBlackImage from '@/shared/assets/images/jordan_black.jpeg';
import jordanBlueImage from '@/shared/assets/images/jordan_blue.jpeg';
import jordanRedImage from '@/shared/assets/images/jordan_red.jpeg';
import newBalanceImage from '@/shared/assets/images/newbalance_993.jpeg';

export const bestAuctionsData: IAuctionItem[] = [
  {
    auctionId: 0,
    productName: '[나이키] 에어 조던 로우',
    imageUrl: jordanRedImage,
    timeRemaining: 50_400,
    minPrice: 100_000,
    participantCount: 11,
    isParticipated: true,
  },
  {
    auctionId: 1,
    productName: '[나이키] 조던 블랙',
    imageUrl: jordanBlackImage,
    timeRemaining: 25_200,
    minPrice: 120_000,
    participantCount: 8,
    isParticipated: true,
  },
  {
    auctionId: 2,
    productName: '[나이키] 조던 블루',
    imageUrl: jordanBlueImage,
    timeRemaining: 82_800,
    minPrice: 180_000,
    participantCount: 29,
    isParticipated: true,
  },
  {
    auctionId: 3,
    productName: '[뉴발란스] 993',
    imageUrl: newBalanceImage,
    timeRemaining: 360,
    minPrice: 230_000,
    participantCount: 32,
    isParticipated: true,
  },
  {
    auctionId: 4,
    productName: '[아디다스] 슈퍼스타',
    imageUrl: adidasImage,
    timeRemaining: 43_200,
    minPrice: 70_000,
    participantCount: 6,
    isParticipated: true,
  },
];

export const imminentAuctionsData: IAuctionItem[] = [
  {
    auctionId: 0,
    productName: '[나이키] 조던 블랙',
    imageUrl: jordanBlackImage,
    timeRemaining: 25_200,
    minPrice: 120_000,
    participantCount: 8,
    isParticipated: true,
  },
  {
    auctionId: 1,
    productName: '[아디다스] 슈퍼스타',
    imageUrl: adidasImage,
    timeRemaining: 43_200,
    minPrice: 70_000,
    participantCount: 6,
    isParticipated: true,
  },
  {
    auctionId: 2,
    productName: '[나이키] 조던 블루',
    imageUrl: jordanBlueImage,
    timeRemaining: 82_800,
    minPrice: 180_000,
    participantCount: 29,
    isParticipated: true,
  },
  {
    auctionId: 3,
    productName: '[뉴발란스] 993',
    imageUrl: newBalanceImage,
    timeRemaining: 360,
    minPrice: 230_000,
    participantCount: 32,
    isParticipated: true,
  },
  {
    auctionId: 4,
    productName: '[나이키] 에어 조던 로우',
    imageUrl: jordanRedImage,
    timeRemaining: 50_400,
    minPrice: 100_000,
    participantCount: 11,
    isParticipated: true,
  },
];

export const preRegisterAuctionsData: IPreAuctionItem[] = [
  {
    productId: 0,
    productName: '[뉴발란스] 993',
    imageUrl: newBalanceImage,
    minPrice: 230_000,
    likeCount: 45,
    isLiked: true,
    isSeller: true,
  },
  {
    productId: 1,
    productName: '[나이키] 에어 조던 로우',
    imageUrl: jordanRedImage,
    minPrice: 100_000,
    likeCount: 30,
    isLiked: true,
    isSeller: true,
  },
  {
    productId: 2,
    productName: '[나이키] 조던 블루',
    imageUrl: jordanBlueImage,
    minPrice: 180_000,
    likeCount: 18,
    isLiked: true,
    isSeller: true,
  },
  {
    productId: 3,
    productName: '[나이키] 조던 블랙',
    imageUrl: jordanBlackImage,
    minPrice: 120_000,
    likeCount: 12,
    isLiked: true,
    isSeller: true,
  },

  {
    productId: 4,
    productName: '[아디다스] 슈퍼스타',
    imageUrl: adidasImage,
    minPrice: 70_000,
    likeCount: 1,
    isLiked: true,
    isSeller: true,
  },
];
