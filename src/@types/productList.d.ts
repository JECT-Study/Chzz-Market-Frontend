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

// 공통된 리스트 아이템 인터페이스
export interface AuctionListItem {
  id: number;
  name: string;
  cdnPath: string | null;
  minPrice: number;
}

// 진행중인 경매 목록
export interface OngoingAuctionListItem extends AuctionListItem {
  timeRemaining: number;
  participantCount: number;
  isParticipating: boolean;
}

// 사전 경매 목록
export interface PreEnrollProductListItem extends AuctionListItem {
  likeCount: number;
  isLiked: boolean;
}

// 정식 등록 경매
export interface OngoingAuctionRegisterdItem extends OngoingAuctionListItem {
  status: string;
  createdAt: string;
}

// 사전 등록 경매
export interface PreEnrollProductRegisteredItem
  extends PreEnrollProductListItem {
  createdAt: string;
}

// 참여 성공한 경매
export interface MyWonAuctionListItem extends AuctionListItem {
  endDateTime: string;
  winningBid: number;
}

export interface MyLostAuctionListItem extends AuctionListItem {
  endDateTime: string;
  highestBid: number;
}

// 참여 경매 목록
export interface MyHistoryAuctionListItem extends AuctionListItem {
  timeRemaining: number;
  participantCount: number;
}

export type OngoingAuctionListData = PaginationData<OngoingAuctionListItem>;
export type PreEnrollProductListData = PaginationData<PreEnrollProductListItem>;
export type OngoingAuctionRegisteredData =
  PaginationData<OngoingAuctionRegisterdItem>;
export type PreEnrollProductRegisteredData =
  PaginationData<PreEnrollProductRegisteredItem>;
export type MyWonAuctionListData = PaginationData<MyWonAuctionListItem>;
export type MyHistoryAuctionListData = PaginationData<MyHistoryAuctionListItem>;
export type MyLostAuctionListData = PaginationData<MyLostAuctionListItem>;
