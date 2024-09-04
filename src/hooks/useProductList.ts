import {
  getOngoingProductList,
  getEnrollProductList,
} from '@/components/product/queries';
import { queryKeys } from '@/constants/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useProductList = (activeTab: string, sortType: string): any => {
  const {
    data: ongoingData,
    isLoading: ongoingLoading,
    error: ongoingError,
    fetchNextPage: fetchNextOngoingPage,
    hasNextPage: hasNextOngoingPage,
  } = useInfiniteQuery({
    queryKey: [queryKeys.ONGOING_ORDER_LIST],
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

  // const {
  //   data: enrollData,
  //   isLoading: enrollLoading,
  //   error: enrollError,
  //   fetchNextPage: fetchNextEnrollPage,
  //   hasNextPage: hasNextEnrollPage,
  // } = useInfiniteQuery({
  //   queryKey: [queryKeys.UPCOMING_ORDER_LIST],
  //   queryFn: ({ pageParam = 0 }) =>
  //   getEnrollProductList({ pageParam, pageSize: 10, sortType }),
  //   getNextPageParam: (lastPage) => {
  //     if (lastPage.pageNumber + 1 >= lastPage.totalPages) {
  //       return undefined;
  //     }
  //     return lastPage.pageNumber + 1;
  //   },
  //   initialPageParam: 0,
  //   enabled: activeTab === 'upcoming',
  // });

  return {
    ongoingData,
    // enrollData,
    fetchNextOngoingPage,
    // fetchNextEnrollPage,
    hasNextOngoingPage,
    // hasNextEnrollPage,
  };
};

export default useProductList;
