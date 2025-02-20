import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

export const getPreAuctionSearch = async (keyword: string) => {
  const response = await httpClient.get(
    `${API_END_POINT.SEARCH}?keyword=${keyword}&status=${'pre'}`
  );

  return response.data;
};
