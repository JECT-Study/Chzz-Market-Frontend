import type { PaginationData } from '@/entities/auction';

export interface IBidder {
  isWinningBidder: boolean;
  bidderNickname: string;
  bidAmount: number;
}

export interface IBidderList extends PaginationData<IBidder> {}
