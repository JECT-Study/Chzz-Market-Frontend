import { IUserAuctionHistoryList, IUserAuctionLostList } from '@/@types/AuctionList';
import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

export interface GetProductParams {
  pageNumber: number;
  pageSize: number;
}

export const getMyHistoryAuction = async ({ pageNumber, pageSize }: GetProductParams): Promise<IUserAuctionHistoryList> => {
  const response = await httpClient.get(`${API_END_POINT.BID}?status=proceeding&page=${pageNumber}&size=${pageSize}`);
  return response.data;
};

export const getMyWonAuction = async ({ pageNumber, pageSize }: GetProductParams): Promise<IUserAuctionLostList> => {
  const response = await httpClient.get(`${API_END_POINT.AUCTION}/won?page=${pageNumber}&size=${pageSize}`);
  return response.data;
};

export const getMyLostAuction = async ({ pageNumber, pageSize }: GetProductParams): Promise<IUserAuctionLostList> => {
  const response = await httpClient.get(`${API_END_POINT.AUCTION}/lost?page=${pageNumber}&size=${pageSize}`);
  return response.data;
};
