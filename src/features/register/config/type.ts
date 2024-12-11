interface IRegisterBase {
  auctionName: string;
  description: string;
  minPrice: number;
  category: string;
}

export interface IRegisterPost extends IRegisterBase {
  auctionRegisterType: string;
  objectKeys: string[];
}

export interface IRegisterPatch extends IRegisterBase {
  imageSequence: { [k: string]: number };
  objectKeyBuffer: { [k: string]: string };
}

export interface IAuctionImageUploadURLs {
  objectKey: string;
  uploadUrl: string;
  expiration: string;
}
