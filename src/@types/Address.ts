import { PaginationData } from './AuctionList';

export interface IAddressDetails {
  recipientName: string;
  phoneNumber: string;
  zipcode: string;
  roadAddress: string;
  jibun: string;
  detailAddress: string;
  isDefault: boolean;
}

export interface IAddressDetail extends IAddressDetails {
  id: string;
}

export interface IAddressData extends PaginationData<IAddressDetails> {}
