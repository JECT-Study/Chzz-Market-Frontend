import { IAuctionItemBase } from './base';
import { IPreAuctionItem } from './item';

// 등록한 경매 내역

// 진행중인 경매
export interface IAuctionOngoingRegisteredItem extends IAuctionItemBase {
  status: string;
  createdAt: string;
  participantCount: number;
  timeRemaining: number;
}

// 종료된 경매
export interface IAuctionEndRegisteredItem extends IAuctionItemBase {
  participantCount: number;
  winningBidAmount: number;
  isWon: boolean;
  isOrdered: boolean;
  createAt: string;
}

// 사전 경매
export interface IPreAuctionRegisteredItem extends IPreAuctionItem {
  createdAt: string;
}
