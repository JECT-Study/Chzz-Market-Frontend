import { IAuctionItem, IPreAuctionItem } from 'AuctionItem';

import adidasImage from '@/assets/images/adidas_superstar.jpeg';
import jordanBlackImage from '@/assets/images/jordan_black.jpeg';
import jordanBlueImage from '@/assets/images/jordan_blue.jpeg';
import jordanRedImage from '@/assets/images/jordan_red.jpeg';
import newBalanceImage from '@/assets/images/newbalance_993.jpeg';

export const bestAuctionsData: IAuctionItem[] = [
  {
    auctionId: 0,
    productName: '[나이키] 에어 조던 로우',
    imgUrl: jordanRedImage,
    timeRemaining: 50_400,
    minPrice: 100_000,
    participantCount: 11,
    isParticipated: true,
  },
  {
    auctionId: 1,
    productName: '[나이키] 조던 블랙',
    imgUrl: jordanBlackImage,
    timeRemaining: 25_200,
    minPrice: 120_000,
    participantCount: 8,
    isParticipated: true,
  },
  {
    auctionId: 2,
    productName: '[나이키] 조던 블루',
    imgUrl: jordanBlueImage,
    timeRemaining: 82_800,
    minPrice: 180_000,
    participantCount: 29,
    isParticipated: true,
  },
  {
    auctionId: 3,
    productName: '[뉴발란스] 993',
    imgUrl: newBalanceImage,
    timeRemaining: 360,
    minPrice: 230_000,
    participantCount: 32,
    isParticipated: true,
  },
  {
    auctionId: 4,
    productName: '[아디다스] 슈퍼스타',
    imgUrl: adidasImage,
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
    imgUrl: jordanBlackImage,
    timeRemaining: 25_200,
    minPrice: 120_000,
    participantCount: 8,
    isParticipated: true,
  },
  {
    auctionId: 1,
    productName: '[아디다스] 슈퍼스타',
    imgUrl: adidasImage,
    timeRemaining: 43_200,
    minPrice: 70_000,
    participantCount: 6,
    isParticipated: true,
  },
  {
    auctionId: 2,
    productName: '[나이키] 조던 블루',
    imgUrl: jordanBlueImage,
    timeRemaining: 82_800,
    minPrice: 180_000,
    participantCount: 29,
    isParticipated: true,
  },
  {
    auctionId: 3,
    productName: '[뉴발란스] 993',
    imgUrl: newBalanceImage,
    timeRemaining: 360,
    minPrice: 230_000,
    participantCount: 32,
    isParticipated: true,
  },
  {
    auctionId: 4,
    productName: '[나이키] 에어 조던 로우',
    imgUrl: jordanRedImage,
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
    imgUrl: newBalanceImage,
    minPrice: 230_000,
    likeCount: 45,
    isLiked: true,
  },
  {
    productId: 1,
    productName: '[나이키] 에어 조던 로우',
    imgUrl: jordanRedImage,
    minPrice: 100_000,
    likeCount: 30,
    isLiked: true,
  },
  {
    productId: 2,
    productName: '[나이키] 조던 블루',
    imgUrl: jordanBlueImage,
    minPrice: 180_000,
    likeCount: 18,
    isLiked: true,
  },
  {
    productId: 3,
    productName: '[나이키] 조던 블랙',
    imgUrl: jordanBlackImage,
    minPrice: 120_000,
    likeCount: 12,
    isLiked: true,
  },

  {
    productId: 4,
    productName: '[아디다스] 슈퍼스타',
    imgUrl: adidasImage,
    minPrice: 70_000,
    likeCount: 1,
    isLiked: true,
  },
];
