import { IAuctionList, IPreAuctionList } from 'AuctionList';

import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/api/axios';

export interface GetProductParams {
  pageNumber: number;
  pageSize: number;
  sortType?: string;
  category?: string;
}

export const getOngoingProductList = async ({ pageNumber, pageSize, sortType = 'newest', category = 'all' }: GetProductParams): Promise<IAuctionList> => {
  const response = await httpClient.get(`${API_END_POINT.ONGOING_PRODUCT_LIST}?category=${category}&sort=${sortType}&page=${pageNumber}&size=${pageSize}`);
  return response.data;
};

export const getEnrollProductList = async ({ pageNumber, pageSize, sortType = 'newest', category = 'all' }: GetProductParams): Promise<IPreAuctionList> => {
  const response = await httpClient.get(`${API_END_POINT.PRE_ENROLL_PRODUCT_LIST}?category=${category}&page=${pageNumber}&size=${pageSize}&sort=${sortType}`);
  return response.data;
};
