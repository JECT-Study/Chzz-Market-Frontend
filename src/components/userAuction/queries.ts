import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/api/axios';
import { IUserAuctionHistoryList, IUserAuctionLostList } from 'AuctionList';

export interface GetProductParams {
  pageNumber: number;
  pageSize: number;
  sortType?: string;
}

export const getMyHistoryAuction = async ({ pageNumber, pageSize, sortType = 'newest' }: GetProductParams): Promise<IUserAuctionHistoryList> => {
  const response = await httpClient.get(`${API_END_POINT.ONGOING_PRODUCT_LIST}/history?page=${pageNumber}&size=${pageSize}&sort=${sortType}`);
  return response.data;
};

export const getMyWonAuction = async ({ pageNumber, pageSize, sortType = 'newest' }: GetProductParams): Promise<IUserAuctionLostList> => {
  const response = await httpClient.get(`${API_END_POINT.ONGOING_PRODUCT_LIST}/won?page=${pageNumber}&size=${pageSize}&sort=${sortType}`);
  return response.data;
};

export const getMyLostAuction = async ({ pageNumber, pageSize, sortType = 'newest' }: GetProductParams): Promise<IUserAuctionLostList> => {
  const response = await httpClient.get(`${API_END_POINT.ONGOING_PRODUCT_LIST}/lost?page=${pageNumber}&size=${pageSize}&sort=${sortType}`);
  return response.data;
};
