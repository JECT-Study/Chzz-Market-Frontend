import { PaginationData } from './AuctionList';

export interface IAddressDetail {
  recipientName: string;
  phoneNumber: string;
  zipcode: string;
  roadAddress: string;
  jibun: string;
  detailAddress: string;
  isDefault: boolean;
}

export interface IAddressData extends PaginationData<IAddressDetail> {}
