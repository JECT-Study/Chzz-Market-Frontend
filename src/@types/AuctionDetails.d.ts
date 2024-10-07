declare module 'AuctionDetails' {
  interface IAuctionDetailsBase {
    productId: number;
    sellerNickname: string;
    productName: string;
    description: string;
    minPrice: number;
    images: {
      imageId: number;
      imageUrl: string;
    }[];
    isSeller: boolean;
    category: string;
  }

  export interface IAuctionDetails extends IAuctionDetailsBase {
    timeRemaining: number;
    status: string;
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
