import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

export const getPreAuctionSearch = async (keyword: string) => {
  const response = await httpClient.get(
    `${API_END_POINT.SEARCH}?keyword=${keyword}&status=${'pre'}`
  );

  return response.data;
};
