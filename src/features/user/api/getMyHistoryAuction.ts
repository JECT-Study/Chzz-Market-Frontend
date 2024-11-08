import { IUserAuctionHistoryList } from "@/@types/AuctionList";
import { GetAuctionProps } from "@/@types/user";
import { API_END_POINT, httpClient } from "@/shared";

export const getMyHistoryAuction = async ({ pageNumber, pageSize }: GetAuctionProps): Promise<IUserAuctionHistoryList> => {
  const response = await httpClient.get(`${API_END_POINT.BID}?status=proceeding&page=${pageNumber}&size=${pageSize}`);
  return response.data;
};
