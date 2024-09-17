import jordanBlackImage from '@/assets/images/jordan_black.jpeg';
import jordanRedImage from '@/assets/images/jordan_red.jpeg';
import { AuctionDetails } from 'Auction';

export const auctionDetailsData: AuctionDetails[] = [
  {
    id: 1,
    name: '[나이키] 에어 조던 로우',
    minPrice: 100_000,
    timeRemaining: 50_400,
    participantCount: 11,
    isParticipating: false,
    bidAmount: 0,
    remainingBidCount: 3,
    cdnPath: jordanRedImage,
  },
  {
    id: 2,
    name: '[나이키] 조던 블랙',
    minPrice: 120_000,
    timeRemaining: 25_200,
    participantCount: 8,
    isParticipating: true,
    bidAmount: 130_000,
    remainingBidCount: 2,
    cdnPath: jordanBlackImage,
  },
];
