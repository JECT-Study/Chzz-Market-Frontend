declare module 'Register' {
  export interface IRegister {
    productName: string;
    description: string;
    minPrice: number;
    auctionRegisterType?: string;
    category: string;
    imageSequence?: Map<number, number>;
  }
}
