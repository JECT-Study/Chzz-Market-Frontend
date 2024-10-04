declare module 'AuctionDetails' {
  export interface IAuctionDetailsBase {
    productId: number;
    sellerName: string;
    description: string;
    productName: string;
    minPrice: number;
    imageList: string[];
  }

  export interface IAuctionDetails extends IAuctionDetailsBase {
    timeRemaining: number;
    status: string;
    isSeller: boolean;
    participantCount: number;
    isParticipated: boolean;
    bidId: number | null;
    bidAmount: number;
    remainingBidCount: number;
  }

  export interface IPreAuctionDetails extends IAuctionDetailsBase {
    createdAt: string;
    likeCount: number;
    isLiked: boolean;
  }
}
