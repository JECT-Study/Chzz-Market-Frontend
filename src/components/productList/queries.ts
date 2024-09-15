import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/api/axios';
import {
  OngoingAuctionListData,
  PreEnrollProductListData,
} from '@/@types/productList';

export interface GetProductParams {
  pageNumber: number;
  pageSize: number;
  sortType?: string;
}

export const getOngoingProductList = async ({
  pageNumber,
  pageSize,
  sortType = 'newest',
}: GetProductParams): Promise<OngoingAuctionListData> => {
  const response = await httpClient.get(
    `${API_END_POINT.ONGOING_PRODUCT_LIST}?category=electronics&sort=${sortType}&page=${pageNumber}&size=${pageSize}`,
  );
  return response.data;
};

export const getEnrollProductList = async ({
  pageNumber,
  pageSize,
  sortType = 'newest',
}: GetProductParams): Promise<PreEnrollProductListData> => {
  const response = await httpClient.get(
    `${API_END_POINT.PRE_ENROLL_PRODUCT_LIST}?category=ELECTRONICS&page=${pageNumber}&size=${pageSize}&sort=${sortType}`,
  );
  return response.data;
};
