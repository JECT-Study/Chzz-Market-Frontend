declare module 'Product' {
  export interface PreEnrollProduct {
    id: number;
    name: string;
    startPrice: string;
    img: string;
  }

  export interface Product extends PreEnrollProduct {
    timeLeft: number;
    activeUserCount: number;
  }
}
