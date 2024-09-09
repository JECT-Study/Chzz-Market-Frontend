import Adidas from '@/assets/images/adidas_superstar.jpeg';
import JordanBlue from '@/assets/images/jordan_blue.jpeg';
import JordanRed from '@/assets/images/jordan_red.jpeg';
import NewBalance from '@/assets/images/newbalance_993.jpeg';
import type { NotificationType } from 'Notification';

export const notificationData: NotificationType[] = [
  {
    id: 0,
    type: 'LikedAuctionStarted',
    message: '좋아요를 누른 사전 등록 제품의 경매가 시작되었습니다!',
    createdAt: '2024-09-09T08:57:30.944646',
    isRead: false,
    cdnPath: JordanBlue,
  },
  {
    id: 1,
    type: 'AuctionItemSold',
    message: '경매에 올린 제품이 낙찰되었습니다!',
    createdAt: '2024-09-08T22:57:30.944646',
    isRead: true,
    cdnPath: NewBalance,
  },
  {
    id: 2,
    type: 'AuctionItemUnSold',
    message: '경매에 올린 제품이 유찰되었습니다.',
    createdAt: '2024-09-08T14:57:30.944646',
    isRead: true,
    cdnPath: JordanRed,
  },
  {
    id: 3,
    type: 'AuctionBidWon',
    message: '축하합니다! 입찰에 참여한 경매의 낙찰자로 선정되었습니다!',
    createdAt: '2024-09-08T07:57:30.944646',
    isRead: true,
    cdnPath: Adidas,
  },
  {
    id: 4,
    type: 'AuctionBidFailed',
    message: '안타깝지만 입찰에 참여한 경매에 낙찰되지 못했습니다.',
    createdAt: '2024-09-01T22:57:30.944646',
    isRead: true,
    cdnPath: JordanBlue,
  },
  {
    id: 5,
    type: 'LikedAuctionCanceled',
    message: '좋아요를 누른 사전 등록 제품이 판매자에 의해 취소되었습니다.',
    createdAt: '2024-08-24T16:57:30.944646',
    isRead: true,
    cdnPath: NewBalance,
  },
];
