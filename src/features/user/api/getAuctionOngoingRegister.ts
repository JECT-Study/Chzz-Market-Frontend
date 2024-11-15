import { IAuctionOngoingRegisteredList } from "@/@types/AuctionList";
import { GetAuctionProps } from "@/@types/user";
import { API_END_POINT, httpClient } from "@/shared";

export const getAuctionOngoingRegister = async ({ pageNumber, pageSize, sortType = 'newest' }: GetAuctionProps): Promise<IAuctionOngoingRegisteredList> => {
  const response = await httpClient.get(`${API_END_POINT.USER_ONGOING_AUCTION_REGISTERED}?sort=${sortType}&page=${pageNumber}&size=${pageSize}`);

  return response.data;
};