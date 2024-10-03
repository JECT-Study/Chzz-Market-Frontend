declare module 'Bid' {
  export interface IBidder {
    isWinningBidder: boolean;
    bidderNickname: string;
    bidAmount: number;
  }

  export interface IBidderList extends PaginationData<IBidder> {}
}
