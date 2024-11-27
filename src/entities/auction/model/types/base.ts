export interface IAuctionItemBase {
  auctionId: number;
  productName: string;
  minPrice: number;
  imageUrl: string;
  isSeller: boolean;
}

export interface IAuctionDetailsBase extends Omit<IAuctionItemBase, 'imageUrl'> {
  sellerNickname: string;
  sellerProfileImageUrl: string;
  description: string;
  status: string;
  category: string;
  images: {
    imageId: number;
    imageUrl: string;
  }[];
}
