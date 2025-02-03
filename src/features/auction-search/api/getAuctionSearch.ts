import { API_END_POINT, httpClient } from '@/shared';

export const getAuctionSearch = async (keyword: string) => {
  const response = await httpClient.get(
    `${API_END_POINT.SEARCH}?keyword=${keyword}&status=${'proceeding'}`
  );

  return response.data;
};
