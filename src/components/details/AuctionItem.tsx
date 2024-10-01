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
