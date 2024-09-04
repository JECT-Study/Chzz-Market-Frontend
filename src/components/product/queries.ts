import { API_END_POINT } from '@/constants/api';
import { ProductListData } from '@/@types/productList';
import { httpClient } from '@/api/axios';

export interface GetProductParams {
  pageNumber: number;
  pageSize: number;
  sortType?: string;
}

export const getOngoingProductList = async ({
  pageNumber,
  pageSize,
  sortType = 'newest',
}: GetProductParams): Promise<ProductListData> => {
  const response = await httpClient.get(
    `${API_END_POINT.ONGOING_PRODUCT_LIST}?category=electronics&sort=${sortType}&page=${pageNumber}&size=${pageSize}`,
  );
  return response.data;
};

export const getEnrollProductList = async ({
  pageNumber,
  pageSize,
  sortType = 'newest',
}: GetProductParams): Promise<ProductListData> => {
  const response = await httpClient.get(
    `${API_END_POINT.UPCOMING_PRODUCT_LIST}?category=electronics&sort=${sortType}&page=${pageNumber}&size=${pageSize}`,
  );

  return response.data;
};
