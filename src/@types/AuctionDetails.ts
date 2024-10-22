interface IAuctionDetailsBase {
  productId: number;
  sellerNickname: string;
  productName: string;
  description: string;
  minPrice: number;
  isSeller: boolean;
  category: string;
  sellerProfileImageUrl: string;
  images: {
    imageId: number;
    imageUrl: string;
  }[];
}

export interface IAuctionDetails extends IAuctionDetailsBase {
  timeRemaining: number;
  status: string;
  participantCount: number;
  isParticipated: boolean;
  bidId: number | null;
  bidAmount: number;
  remainingBidCount: number;
  isCancelled: boolean;
}

export interface IPreAuctionDetails extends IAuctionDetailsBase {
  updatedAt: string;
  likeCount: number;
  isLiked: boolean;
}
