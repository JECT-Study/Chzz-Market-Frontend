
import { getAuctionEndRegister, getAuctionOngoingRegister, getAuctionPreAuctionRegister } from '@/features/user/api';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useMyAuctionList = (activeTab: string): any => {
  const {
    data: ongoingData,
    isLoading: _ongoingLoading,
    error: _ongoingError,
    fetchNextPage: fetchNextOngoingPage,
    hasNextPage: hasNextOngoingPage,
    refetch: refetchOngoingData,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.USER_AUCTION_REGISTERED],
    queryFn: () => getAuctionOngoingRegister({ pageNumber: 0, pageSize: 10 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber + 1 >= lastPage.totalPages) {
        return undefined;
      }
      return lastPage.pageNumber + 1;
    },
    initialPageParam: 0,
    enabled: activeTab === 'ongoing', // 활성화 상태 설정
  });

  const {
    data: endData,
    isLoading: _endLoading,
    error: _endError,
    fetchNextPage: fetchNextEndPage,
    hasNextPage: hasNextEndPage,
    refetch: refetchEndData,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.USER_AUCTION_REGISTERED],
    queryFn: () => getAuctionEndRegister({ pageNumber: 0, pageSize: 10 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber + 1 >= lastPage.totalPages) {
        return undefined;
      }
      return lastPage.pageNumber + 1;
    },
    initialPageParam: 0,
    enabled: activeTab === 'end', // 활성화 상태 설정
  });

  const {
    data: enrollData,
    isLoading: _enrollLoading,
    error: _enrollError,
    fetchNextPage: fetchNextEnrollPage,
    hasNextPage: hasNextEnrollPage,
    refetch: refetchEnrollData,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.USER_PRE_AUCTION_REGISTERED],
    queryFn: () => getAuctionPreAuctionRegister({ pageNumber: 0, pageSize: 10 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber + 1 >= lastPage.totalPages) {
        return undefined;
      }
      return lastPage.pageNumber + 1;
    },
    initialPageParam: 0,
    enabled: activeTab === 'preAuction',
  });

  return {
    ongoingData,
    endData,
    enrollData,
    fetchNextOngoingPage,
    fetchNextEndPage,
    fetchNextEnrollPage,
    hasNextOngoingPage,
    hasNextEndPage,
    hasNextEnrollPage,
    refetchOngoingData,
    refetchEndData,
    refetchEnrollData,
  };
};
