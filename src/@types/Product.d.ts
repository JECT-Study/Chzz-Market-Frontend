declare module 'Product' {
  export interface PreRegisterProduct {
    id: number;
    name: string;
    startPrice: string;
    img: string;
  }

  export interface Product extends PreRegisterProduct {
    timeLeft: number;
    activeUserCount: number;
  }

  export interface BidProduct extends Product {
    isParticipating: boolean;
    bidAmount: number;
    remainingBidCount: number;
  }
}
