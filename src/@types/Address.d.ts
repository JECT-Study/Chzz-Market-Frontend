export interface AddressDetail {
  recipientName: string,
  phoneNumber: string,
  zipcode: string,
  roadAddress: string,
  jibun: string,
  detailAddress: string,
  isDefault: boolean,
}

export interface AddressData {
  hasNext: boolean;
  items: AddressDetail[];
  last: boolean;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}