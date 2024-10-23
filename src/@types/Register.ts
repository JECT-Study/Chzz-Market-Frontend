export interface IRegister {
  productName: string;
  description: string;
  minPrice: number;
  auctionRegisterType?: string;
  category: string;
  imageSequence?: { [k: string]: number };
}
