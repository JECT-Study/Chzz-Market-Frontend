declare module 'Product' {
  export interface Product {
    id: number;
    name: string;
    startPrice: string;
    img: string;
  }
  export interface PreRegisterProduct extends Product {
    likeCount: number;
  }
  export interface RegisterProduct extends Product {
    activeUserCount: number;
    timeLeft: number;
  }

  export interface ProductDetails extends RegisterProduct {
    isParticipating: boolean;
    bidAmount: number;
    remainingBidCount: number;
  }
}
