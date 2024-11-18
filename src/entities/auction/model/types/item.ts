import { IAuctionItemBase } from './base';

export interface IAuctionItem extends IAuctionItemBase {
  auctionId: number;
  participantCount: number;
  timeRemaining: number;
  isParticipated: boolean;
}

export interface IPreAuctionItem extends IAuctionItemBase {
  productId: number;
  likeCount: number;
  isLiked: boolean;
  isSeller: boolean;
}
