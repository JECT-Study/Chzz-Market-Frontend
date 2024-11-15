import { IAuctionDetailsBase } from './base';

export interface IAuctionDetails extends IAuctionDetailsBase {
  timeRemaining: number;
  status: string;
  participantCount: number;
  isParticipated: boolean;
  bidId: number | null;
  bidAmount: number;
  remainingBidCount: number;
  isCancelled: boolean;
  isWinner: boolean;
  isWon: boolean;
  isOrdered?: boolean;
}

export interface IPreAuctionDetails extends IAuctionDetailsBase {
  updatedAt: string;
  likeCount: number;
  isLiked: boolean;
}
