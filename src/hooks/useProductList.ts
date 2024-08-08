import {
  getOngoingProductList,
  getUpcomingProductList,
} from '@/api/product.api';
import { BASE_KEY } from '@/constants/queryKey';
import { useInfiniteQuery } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useProductList = (): any => {
  const {
    data: ongoingData,
    isLoading: ongoingLoading,
    error: ongoingError,
    fetchNextPage: fetchNextOngoingPage,
    hasNextPage: hasNextOngoingPage,
  } = useInfiniteQuery({
    queryKey: [BASE_KEY.ONGOING_ORDER_LIST],
    queryFn: ({ pageParam = 1 }) =>
      getOngoingProductList({ pageParam, pageSize: 10 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext) {
        return lastPage.pageNumber + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const {
    data: upcomingData,
    isLoading: upcomingLoading,
    error: upcomingError,
    fetchNextPage: fetchNextUpcomingPage,
    hasNextPage: hasNextUpcomingPage,
  } = useInfiniteQuery({
    queryKey: [BASE_KEY.UPCOMING_ORDER_LIST],
    queryFn: ({ pageParam = 1 }) =>
      getUpcomingProductList({ pageParam, pageSize: 10 }),
    getNextPageParam: (lastPage) => {
      console.log(lastPage);
      if (lastPage.hasNext) {
        return lastPage.pageNumber + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
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
