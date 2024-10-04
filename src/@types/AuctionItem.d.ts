declare module 'AuctionItem' {
  export interface IAuctionItemBase {
    id: number;
    name: string;
    minPrice: number;
    cdnPath: string;
  }

  export interface IPreAuctionItem extends IAuctionItemBase {
    likeCount: number;
    isLiked: boolean;
  }

  export interface IPreAuctionRegisteredItem extends IPreAuctionItem {
    createdAt: string;
  }

  export interface IAuctionItem extends IAuctionItemBase {
    participantCount: number;
    timeRemaining: number;
    isParticipated: boolean;
  }
  export interface IAuctionRegisteredItem extends IAuctionItem {
    status: string;
    createdAt: string;
  }

  export interface IUserAuctionWonItem extends IAuctionItemBase {
    endDateTime: string;
    winningBid: number;
  }

  export interface IUserAuctionLostItem extends IAuctionItemBase {
    endDateTime: string;
    highestBid: number;
  }

  export interface IUserAuctionHistoryItem extends Omit<IAuctionItem, 'isParticipated'> {}
}
