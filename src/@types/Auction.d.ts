declare module 'Auction' {
  export interface Auction {
    id: number;
    name: string;
    minPrice: number;
    cdnPath: string;
  }
  export interface PreRegisterAuction extends Auction {
    likeCount: number;
  }
  export interface RegisterAuction extends Auction {
    participantCount: number;
    timeRemaining: number;
  }
  export interface AuctionDetails extends RegisterAuction {
    isParticipating: boolean;
    bidAmount: number;
    remainingBidCount: number;
  }
}
