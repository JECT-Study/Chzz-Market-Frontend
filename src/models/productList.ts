export interface ProductListItem {
  id: number;
  name: string;
  cdnPath: string | null;
  timeRemaining: number;
  minPrice: number;
  participantCount: number;
  isParticipating: boolean;
}

export interface ProductListData {
  hasNext: boolean;
  items: ProductListItem[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
}
