import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/api/axios';
import {
  OngoingAuctionRegisteredData,
  PreEnrollProductRegisteredData,
} from '@/@types/productList';

export interface GetAuctionProps {
  pageNumber: number;
  pageSize: number;
  sortType?: string;
  nickname: string;
}

export const getAuctionOngoingRegister = async ({
  pageNumber,
  pageSize,
  sortType = 'newest',
  nickname,
}: GetAuctionProps): Promise<OngoingAuctionRegisteredData> => {
  const response = await httpClient.get(
    `${API_END_POINT.MY_ACUTION_ONGOING_REGISTER}/${nickname}?&sort=${sortType}&page=${pageNumber}&size=${pageSize}`,
  );
  return response.data;
};

export const getAuctionPreEnrollRegister = async ({
  pageNumber,
  pageSize,
  sortType = 'newest',
  nickname,
}: GetAuctionProps): Promise<PreEnrollProductRegisteredData> => {
  const response = await httpClient.get(
    `${API_END_POINT.MY_ACUTION_PRE_ENROLL_REGISTER}/${nickname}?&sort=${sortType}&page=${pageNumber}&size=${pageSize}`,
  );
  return response.data;
};
