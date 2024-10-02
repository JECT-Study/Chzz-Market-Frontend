import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/api/axios';
import {
  MyLostAuctionListData,
  MyHistoryAuctionListData,
  MyWonAuctionListData,
} from '@/@types/productList';

export interface GetProductParams {
  pageNumber: number;
  pageSize: number;
  sortType?: string;
}

export const getMyHistoryAuction = async ({
  pageNumber,
  pageSize,
  sortType = 'newest',
}: GetProductParams): Promise<MyHistoryAuctionListData> => {
  const response = await httpClient.get(
    `${API_END_POINT.ONGOING_PRODUCT_LIST}/history?page=${pageNumber}&size=${pageSize}&sort=${sortType}`,
  );
  return response.data;
};

export const getMyWonAuction = async ({
  pageNumber,
  pageSize,
  sortType = 'newest',
}: GetProductParams): Promise<MyWonAuctionListData> => {
  const response = await httpClient.get(
    `${API_END_POINT.ONGOING_PRODUCT_LIST}/won?page=${pageNumber}&size=${pageSize}&sort=${sortType}`,
  );
  return response.data;
};

export const getMyLostAuction = async ({
  pageNumber,
  pageSize,
  sortType = 'newest',
}: GetProductParams): Promise<MyLostAuctionListData> => {
  const response = await httpClient.get(
    `${API_END_POINT.ONGOING_PRODUCT_LIST}/lost?page=${pageNumber}&size=${pageSize}&sort=${sortType}`,
  );
  return response.data;
};
