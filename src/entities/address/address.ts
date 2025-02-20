import type { PaginationData } from '@/entities';

export interface IAddressBase {
  recipientName: string;
  phoneNumber: string;
  zipcode: string;
  roadAddress: string;
  jibun: string;
  detailAddress: string;
  isDefault?: boolean;
}

export interface IAddressWithId extends IAddressBase {
  id: string;
}

export interface IAddressData extends PaginationData<IAddressBase> {}