import jordanBlackImage from '@/assets/images/jordan_black.jpeg';
import jordanRedImage from '@/assets/images/jordan_red.jpeg';

export const bidProductData = [
  {
    id: 1,
    name: '[나이키] 에어 조던 로우',
    startPrice: '100,000원',
    timeLeft: 14,
    activeUserCount: 11,
    isParticipating: false,
    bidAmount: 0,
    remainingBidCount: 3,
    img: jordanRedImage,
  },
  {
    id: 2,
    name: '[나이키] 조던 블랙',
    startPrice: '120,000원',
    timeLeft: 7,
    activeUserCount: 8,
    isParticipating: true,
    bidAmount: 130_000,
    remainingBidCount: 2,
    img: jordanBlackImage,
  },
];