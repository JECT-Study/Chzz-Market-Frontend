export interface AuctionItem {
  productId: number;
  sellerName: string;
  name: string;
  description: string;
  minPrice: number;
  timeRemaining: number;
  status: string;
  isSeller: boolean;
  participantCount: number;
  isParticipating: boolean;
  bidId: number | null;
  bidAmount: number;
  remainingBidCount: number;
  imageList: string[];
}

export interface PreAuctionItem {
  productId: number;
  productName: string;
  sellerName: string;
  minPrice: number;
  createdAt: string;
  description: string;
  likeCount: number;
  isLiked: boolean;
  imageUrls: string[];
}
