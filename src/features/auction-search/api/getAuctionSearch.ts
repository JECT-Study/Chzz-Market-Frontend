import { API_END_POINT, httpClient } from "@/shared";

export const getAuctionSearch = async () => {
  const response = await httpClient.get(`${API_END_POINT.SEARCH}?keyword=${'가'}&status=${'proceeding'}`);

  return response.data;
};