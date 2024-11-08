import { ProductParams } from "@/@types/AuctionItem";
import { IPreAuctionList } from "@/@types/AuctionList";
import { API_END_POINT, httpClient } from "@/shared";

export const getEnrollProductList = async ({ pageNumber, pageSize, sortType = 'newest', category = 'all' }: ProductParams): Promise<IPreAuctionList> => {
  const response = await httpClient.get(`${API_END_POINT.PRE_AUCTION}?category=${category}&page=${pageNumber}&size=${pageSize}&sort=${sortType}`);
  return response.data;
};