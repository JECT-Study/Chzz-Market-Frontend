import { API_END_POINT } from '@/constants/api';
import { ProductListData } from '@/@types/productList';
import { httpClient } from '@/api/axios';

export interface GetProductParams {
  pageParam: number;
  pageSize: number;
  sortType?: string;
}

export const getOngoingProductList = async ({
  pageParam,
  pageSize,
  sortType = 'newest',
}: GetProductParams): Promise<ProductListData> => {
  const response = await httpClient.get(
    `${API_END_POINT.ONGOING_PRODUCT_LIST}?category=fashion&type=${sortType}&page=${pageParam}&limit=${pageSize}`,
  );
  return response.data;
};

export const getEnrollProductList = async ({
  pageParam,
  pageSize,
  sortType = 'newest',
}: GetProductParams): Promise<ProductListData> => {
  const response = await httpClient.get(
    `${API_END_POINT.UPCOMING_PRODUCT_LIST}?category=fashion&type=${sortType}&page=${pageParam}&limit=${pageSize}`,
  );

  return response.data;
};
