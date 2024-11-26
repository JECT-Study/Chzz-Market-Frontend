import { IAuctionItemBase } from './base';

export interface IAuctionItem extends IAuctionItemBase {
  participantCount: number;
  timeRemaining: number;
  isParticipated: boolean;
}

export interface IPreAuctionItem extends IAuctionItemBase {
  likeCount: number;
  isLiked: boolean;
}
