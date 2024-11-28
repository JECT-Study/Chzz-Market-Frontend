import { getEnrollProductList, getOngoingProductList } from '@/features/product-list/api';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useProductList = (activeTab: string, ongoingSortType: string, preAuctionSortType: string, category: string): any => {
  const {
    data: ongoingData,
    isLoading: _ongoingLoading,
    error: _ongoingError,
    fetchNextPage: fetchNextOngoingPage,
    hasNextPage: hasNextOngoingPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.AUCTION_LIST, ongoingSortType, category],
    queryFn: () =>
      getOngoingProductList({
        pageNumber: 0,
        pageSize: 10,
        sortType: ongoingSortType,
        category,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber + 1 >= lastPage.totalPages) {
        return undefined;
      }
      return lastPage.pageNumber + 1;
    },
    initialPageParam: 0,
    enabled: activeTab === 'ongoing',
  });

  const {
    data: enrollData,
    isLoading: _enrollLoading,
    error: _enrollError,
    fetchNextPage: fetchNextEnrollPage,
    hasNextPage: hasNextEnrollPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRE_AUCTION_LIST, preAuctionSortType, category],
    queryFn: () => getEnrollProductList({ pageNumber: 0, pageSize: 10, sortType: preAuctionSortType, category }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber + 1 >= lastPage.totalPages) {
        return undefined;
      }
      return lastPage.pageNumber + 1;
    },
    initialPageParam: 0,
    enabled: activeTab === 'pre-enroll',
  });

  return {
    ongoingData,
    enrollData,
    fetchNextOngoingPage,
    fetchNextEnrollPage,
    hasNextOngoingPage,
    hasNextEnrollPage,
  };
};
