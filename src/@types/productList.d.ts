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

export interface PreEnrollAuctionListItem {
  id: number;
  name: string;
  cdnPath: string;
  likeCount: number;
  isLiked: boolean;
  minPrice: number;
}

export interface PreEnrollAuctionListData {
  hasNext: boolean;
  items: PreEnrollAuctionListItem[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
}

export interface OngoingProductListItem extends OngoingAuctionListItem {
  status: string;
  createdAt: string;
}

export interface OngoingProductListData extends OngoingAuctionListData {
  items: OngoingProductListItem[];
}

export interface PreEnrollProductListItem extends PreEnrollProductListItem {
  createdAt: string;
}

export interface PreEnrollProductListData extends PreEnrollAuctionListData {
  items: PreEnrollProductListItem[];
}
