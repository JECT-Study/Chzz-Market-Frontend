import { IPreAuctionRegisteredList } from "@/@types/AuctionList";
import { GetAuctionProps } from "@/@types/user";
import { API_END_POINT, httpClient } from "@/shared";

export const getAuctionPreAuctionRegister = async ({
  pageNumber,
  pageSize,
  sortType = 'product-newest',
}: GetAuctionProps): Promise<IPreAuctionRegisteredList> => {
  const response = await httpClient.get(`${API_END_POINT.USER_PRE_AUCTION_REGISTERED}?sort=${sortType}&page=${pageNumber}&size=${pageSize}`);
  return response.data;
};