import { API_END_POINT } from '@/constants/api';
import { ProductListData } from '@/types/productList';
import { httpClient } from '@/utils/axios';

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
  const { items, totalElements } = response.data;
  const totalPages = Math.ceil(totalElements / pageSize);
  const last = pageParam >= totalPages;
  const hasNext = !last;

  return {
    items,
    pageNumber: pageParam,
    pageSize,
    totalPages,
    totalElements,
    last,
    hasNext,
  };
};

export const getUpcomingProductList = async ({
  pageParam,
  pageSize,
  sortType = 'newest',
}: GetProductParams): Promise<ProductListData> => {
  const response = await httpClient.get(
    `${API_END_POINT.UPCOMING_PRODUCT_LIST}?category=fashion&type=${sortType}&page=${pageParam}&limit=${pageSize}`,
  );
  const { items, totalElements } = response.data;
  const totalPages = Math.ceil(totalElements / pageSize);
  const last = pageParam >= totalPages;
  const hasNext = !last;

  return {
    items,
    pageNumber: pageParam,
    pageSize,
    totalPages,
    totalElements,
    last,
    hasNext,
  };
};
