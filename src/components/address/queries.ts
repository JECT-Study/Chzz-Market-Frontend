import { httpClient } from "@/api/axios";
import { API_END_POINT } from "@/constants/api";

export const useGetAddressDetail = async (auctionId: string | undefined) => {
  const response = await httpClient.get(`${API_END_POINT.AUCTIONS}/${auctionId}?type=simple`);
  return response.data;
}