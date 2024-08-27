import {
  getOngoingProductList,
  getUpcomingProductList,
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
    queryFn: ({ pageParam = 1 }) =>
      getOngoingProductList({ pageParam, pageSize: 10, sortType }),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext) {
        return lastPage.pageNumber + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
    enabled: activeTab === 'ongoing',
  });

  const {
    data: upcomingData,
    isLoading: upcomingLoading,
    error: upcomingError,
    fetchNextPage: fetchNextUpcomingPage,
    hasNextPage: hasNextUpcomingPage,
  } = useInfiniteQuery({
    queryKey: [queryKeys.UPCOMING_ORDER_LIST],
    queryFn: ({ pageParam = 1 }) =>
      getUpcomingProductList({ pageParam, pageSize: 10, sortType }),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext) {
        return lastPage.pageNumber + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
    enabled: activeTab === 'upcoming',
  });

  return {
    ongoingData,
    upcomingData,
    fetchNextOngoingPage,
    fetchNextUpcomingPage,
    hasNextOngoingPage,
    hasNextUpcomingPage,
  };
};

export default useProductList;
