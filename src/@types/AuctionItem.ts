interface IAuctionItemBase {
  productName: string;
  minPrice: number;
  imageUrl: string;
}

export interface IAuctionItem extends IAuctionItemBase {
  auctionId: number;
  participantCount: number;
  timeRemaining: number;
  isParticipated: boolean;
}
export interface IAuctionOngoingRegisteredItem extends IAuctionItemBase {
  status: string;
  createdAt: string;
  participantCount: number;
  timeRemaining: number;
  auctionId: number;
}

export interface IAuctionEndRegisteredItem extends IAuctionItemBase {
  auctionId: number;
  participantCount: number;
  winningBidAmount: number;
  isWon: boolean;
  isOrdered: boolean;
  createAt: string;
}

export interface IPreAuctionItem extends IAuctionItemBase {
  productId: number;
  likeCount: number;
  isLiked: boolean;
}
export interface IPreAuctionRegisteredItem extends IPreAuctionItem {
  createdAt: string;
}

export interface IUserAuctionWonItem extends IAuctionItemBase {
  auctionId: number;
  endDateTime: string;
  winningAmount: number;
  isOrdered: boolean;
  orderId: number;
  participantCount: number;
}
export interface IUserAuctionLostItem extends IAuctionItemBase {
  endDateTime: string;
  bidAmount: number;
  auctionId: number;
  participantCount: number;
}
export interface IUserAuctionHistoryItem extends Omit<IAuctionItem, 'isParticipated'> {
  auctionId: number;
  bidAmount: number;
}
