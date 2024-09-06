import Adidas from '@/assets/images/adidas_superstar.jpeg';
import JordanBlue from '@/assets/images/jordan_blue.jpeg';
import JordanRed from '@/assets/images/jordan_red.jpeg';
import NewBalance from '@/assets/images/newbalance_993.jpeg';

export const notificationData = [
  {
    id: 0,
    type: 'LikedAuctionStarted',
    message: '좋아요를 누른 사전 등록 제품의 경매가 시작되었습니다!',
    time: '1분 전',
    img: JordanBlue,
    check: false,
    link: '/',
  },
  {
    id: 1,
    type: 'AuctionItemSold',
    message: '경매에 올린 제품이 낙찰되었습니다!',
    time: '1시간 전',
    img: NewBalance,
    check: true,
    link: '/',
  },
  {
    id: 2,
    type: 'AuctionItemUnSold',
    message: '경매에 올린 제품이 유찰되었습니다.',
    time: '3시간 전',
    img: JordanRed,
    check: true,
    link: '/',
  },
  {
    id: 3,
    type: 'AuctionBidWon',
    message: '축하합니다! 입찰에 참여한 경매의 낙찰자로 선정되었습니다!',
    time: '2일 전',
    img: Adidas,
    check: true,
    link: '/',
  },
  {
    id: 4,
    type: 'AuctionBidFailed',
    message: '안타깝지만 입찰에 참여한 경매에 낙찰되지 못했습니다.',
    time: '2일 전',
    img: JordanBlue,
    check: true,
    link: '/',
  },
  {
    id: 5,
    type: 'LikedAuctionCanceled',
    message: '좋아요를 누른 사전 등록 제품이 판매자에 의해 취소되었습니다.',
    time: '2일 전',
    img: NewBalance,
    check: true,
    link: '/',
  },
];
