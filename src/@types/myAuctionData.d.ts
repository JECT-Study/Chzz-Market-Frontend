import type { Auction } from 'Auction';

// 개별 제품의 인터페이스
export interface AuctionItem extends Auction {
  status: string;
  createdAt: string;
}

// 페이지 정보에 대한 인터페이스
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

// 정렬 정보에 대한 인터페이스
export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

// 메인 데이터 구조에 대한 인터페이스
export interface MyAuctionData {
  content: AuctionItem[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}
