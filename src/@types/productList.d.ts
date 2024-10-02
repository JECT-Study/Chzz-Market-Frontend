import type {
  IAuctionItem,
  IAuctionRegisteredItem,
  IPreAuctionItem,
  IPreAuctionRegisteredItem,
  IUserAuctionHistoryItem,
  IUserAuctionLostItem,
  IUserAuctionWonItem,
} from 'AuctionItem';

// 기본적인 페이지네이션 데이터를 위한 인터페이스
export interface PaginationData<T> {
  hasNext: boolean;
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
}

export type OngoingAuctionListData = PaginationData<IAuctionItem>;
export type PreEnrollProductListData = PaginationData<IPreAuctionItem>;
export type OngoingAuctionRegisteredData = PaginationData<IAuctionRegisteredItem>;
export type PreEnrollProductRegisteredData = PaginationData<IPreAuctionRegisteredItem>;
export type MyWonAuctionListData = PaginationData<IUserAuctionWonItem>;
export type MyHistoryAuctionListData = PaginationData<IUserAuctionLostItem>;
export type MyLostAuctionListData = PaginationData<IUserAuctionHistoryItem>;
