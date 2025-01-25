import adidasImage from '@/shared/assets/test/adidas.png';
import jordanBlueImage from '@/shared/assets/test/jordanBlue.png';
import jordanRedImage from '@/shared/assets/test/jordanRed.png';
import newBalanceImage from '@/shared/assets/test/newBalance.png';
import type { INotification } from '../config';

export const notificationData: INotification[] = [
  {
    notificationId: 0,
    type: 'AUCTION_START',
    message: '미리 찜하기를 누른 사전 등록 제품의 경매가 시작되었습니다!',
    createdAt: '2024-09-09T08:57:30.944646',
    isRead: false,
    imageUrl: jordanBlueImage,
    auctionId: 59,
  },
  {
    notificationId: 1,
    type: 'AUCTION_SUCCESS',
    message: '경매에 올린 제품이 낙찰되었습니다!',
    createdAt: '2024-09-08T22:57:30.944646',
    isRead: true,
    imageUrl: newBalanceImage,
    auctionId: 59,
  },
  {
    notificationId: 2,
    type: 'AUCTION_FAILURE',
    message: '경매에 올린 제품이 유찰되었습니다.',
    createdAt: '2024-09-08T14:57:30.944646',
    isRead: true,
    imageUrl: jordanRedImage,
  },
  {
    notificationId: 3,
    type: 'AUCTION_WINNER',
    message: '축하합니다! 입찰에 참여한 경매의 낙찰자로 선정되었습니다!',
    createdAt: '2024-09-08T07:57:30.944646',
    isRead: true,
    imageUrl: adidasImage,
    auctionId: 59,
  },
  {
    notificationId: 4,
    type: 'AUCTION_FAILURE',
    message: '안타깝지만 입찰에 참여한 경매에 낙찰되지 못했습니다.',
    createdAt: '2024-09-01T22:57:30.944646',
    isRead: true,
    imageUrl: jordanBlueImage,
  },
  {
    notificationId: 5,
    type: 'PRE_AUCTION_CANCELED',
    message: '미리 찜하기를 누른 사전 등록 제품이 판매자에 의해 취소되었습니다.',
    createdAt: '2024-08-24T16:57:30.944646',
    isRead: true,
    imageUrl: newBalanceImage,
  },
];

export const realTimeNotificationData = [
  'id:1_1722845403085\nevent:notification\ndata:{ "notificationId": 1, "message": "경매에 올린 test가 낙찰되었습니다.", "type": "AUCTION_SUCCESS", "auctionId": 59}\n\n',
  'id:1_1722845403090\nevent:notification\ndata:{ "notificationId": 2, "message": "경매에 올린 test가 미낙찰되었습니다.", "type": "AUCTION_FAILURE"}\n\n',
  'id:1_1722845403175\nevent:notification\ndata:{ "notificationId": 3, "message": "축하합니다! 입찰에 참여한 경매 test의 낙찰자로 선정되었습니다.", "type": "AUCTION_WINNER", "auctionId": 62}\n\n',
];
