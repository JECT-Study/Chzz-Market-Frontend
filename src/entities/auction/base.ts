export interface IAuctionItemBase {
  productName: string;
  minPrice: number;
  imageUrl: string;
}

export interface IAuctionDetailsBase {
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
