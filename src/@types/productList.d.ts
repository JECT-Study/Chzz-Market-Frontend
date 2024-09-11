export interface OngoingAuctionListItem {
  id: number;
  name: string;
  cdnPath: string | null;
  timeRemaining: number;
  minPrice: number;
  participantCount: number;
  isParticipating: boolean;
}

export interface OngoingAuctionListData {
  hasNext: boolean;
  items: OngoingAuctionListItem[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
}

export interface PreEnrollProductListItem {
  id: number;
  name: string;
  cdnPath: string;
  likeCount: number;
  isLiked: boolean;
  minPrice: number;
}

export interface PreEnrollProductListData {
  hasNext: boolean;
  items: PreEnrollProductListItem[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
}

export interface OngoingAuctionRegisterdItem extends OngoingAuctionListItem {
  status: string;
  createdAt: string;
}

export interface OngoingAuctionRegisteredData extends OngoingAuctionListData {
  items: OngoingAuctionRegisterdItem[];
}

export interface PreEnrollProductRegisteredItem
  extends PreEnrollProductListItem {
  createdAt: string;
}

export interface PreEnrollProductRegisteredData
  extends PreEnrollProductListData {
  items: PreEnrollProductRegisteredData[];
}
