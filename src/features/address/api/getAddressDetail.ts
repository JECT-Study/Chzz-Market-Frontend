import { API_END_POINT, httpClient } from "@/shared";

export const getAddressDetail = async (auctionId: string) => {
  const response = await httpClient.get(`${API_END_POINT.AUCTION}/${auctionId}/won`);
  return response.data;
};