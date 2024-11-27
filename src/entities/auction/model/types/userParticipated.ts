import type { IAuctionItemBase } from './base';
import type { IAuctionItem } from './item';

// 참여한 정식 경매 내역
export interface IUserAuctionHistoryItem extends Omit<IAuctionItem, 'isParticipated'> {
  bidAmount: number;
}

// 성공한 경매
export interface IUserAuctionWonItem extends IAuctionItemBase {
  endDateTime: string;
  winningAmount: number;
  isOrdered: boolean;
  orderId: number;
  participantCount: number;
}

// 실패한 경매
export interface IUserAuctionLostItem extends IAuctionItemBase {
  endDateTime: string;
  bidAmount: number;
  participantCount: number;
}
