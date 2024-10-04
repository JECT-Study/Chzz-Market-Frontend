import {
  getAuctionOngoingRegister,
  getAuctionPreEnrollRegister,
} from '@/components/user/queries';

import { queryKeys } from '@/constants/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useMyAuctionList = (activeTab: boolean, nickname: string): any => {
  const {
    data: ongoingData,
    isLoading: _ongoingLoading,
    error: _ongoingError,
    fetchNextPage: fetchNextOngoingPage,
    hasNextPage: hasNextOngoingPage,
    refetch: refetchOngoingData,
  } = useInfiniteQuery({
    queryKey: [queryKeys.MY_AUCTION_REGISTERD, nickname],
    queryFn: () =>
      getAuctionOngoingRegister({ pageNumber: 0, pageSize: 10 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber + 1 >= lastPage.totalPages) {
        return undefined;
      }
      return lastPage.pageNumber + 1;
    },
    initialPageParam: 0,
    enabled: activeTab === true, // 활성화 상태 설정
  });

  const {
    data: enrollData,
    isLoading: _enrollLoading,
    error: _enrollError,
    fetchNextPage: fetchNextEnrollPage,
    hasNextPage: hasNextEnrollPage,
    refetch: refetchEnrollData,
  } = useInfiniteQuery({
    queryKey: [queryKeys.MY_PRODUCT_REGISTERD, nickname],
    queryFn: () =>
      getAuctionPreEnrollRegister({ pageNumber: 0, pageSize: 10 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber + 1 >= lastPage.totalPages) {
        return undefined;
      }
      return lastPage.pageNumber + 1;
    },
    initialPageParam: 0,
    enabled: activeTab === false,
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

export default useMyAuctionList;
