import {
  getEnrollProductList,
  getOngoingProductList,
} from '@/components/productList/queries';

import { queryKeys } from '@/constants/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useProductList = (activeTab: string, sortType: string): any => {
  const {
    data: ongoingData,
    isLoading: _ongoingLoading,
    error: _ongoingError,
    fetchNextPage: fetchNextOngoingPage,
    hasNextPage: hasNextOngoingPage,
    refetch: refetchOngoingData,
  } = useInfiniteQuery({
    queryKey: [queryKeys.ONGOING_AUCTION_LIST, sortType],
    queryFn: () =>
      getOngoingProductList({ pageNumber: 0, pageSize: 10, sortType }),
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
    refetch: refetchEnrollData,
  } = useInfiniteQuery({
    queryKey: [queryKeys.PRE_ENROLL_PRODUCT_LIST, sortType],
    queryFn: () =>
      getEnrollProductList({ pageNumber: 0, pageSize: 10, sortType }),
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
    refetchOngoingData,
    refetchEnrollData,
  };
};

export default useProductList;
