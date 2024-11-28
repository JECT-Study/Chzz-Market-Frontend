import { getMyHistoryAuction, getMyLostAuction, getMyWonAuction } from '@/features/user/api';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useHistory = (activeTab: string): any => {
  const {
    data: historyData,
    isLoading: historyLoading,
    error: _historyError,
    fetchNextPage: fetchNextHistoryPage,
    hasNextPage: hasNextHistoryPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.AUCTION_HISTORY],
    queryFn: () => getMyHistoryAuction({ pageNumber: 0, pageSize: 10 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber + 1 >= lastPage.totalPages) {
        return undefined;
      }
      return lastPage.pageNumber + 1;
    },
    initialPageParam: 0,
    enabled: activeTab === 'AuctionHistory',
  });

  const {
    data: wonData,
    isLoading: wonLoading,
    error: _wonError,
    fetchNextPage: fetchNextWonPage,
    hasNextPage: hasNextWonPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.AUCTION_WON],
    queryFn: () => getMyWonAuction({ pageNumber: 0, pageSize: 10 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber + 1 >= lastPage.totalPages) {
        return undefined;
      }
      return lastPage.pageNumber + 1;
    },
    initialPageParam: 0,
    enabled: activeTab === 'AuctionsWon',
  });

  const {
    data: lostData,
    isLoading: lostLoading,
    error: _lostError,
    fetchNextPage: fetchNextLostPage,
    hasNextPage: hasNextLostPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.AUCTION_LOST],
    queryFn: () => getMyLostAuction({ pageNumber: 0, pageSize: 10 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber + 1 >= lastPage.totalPages) {
        return undefined;
      }
      return lastPage.pageNumber + 1;
    },
    initialPageParam: 0,
    enabled: activeTab === 'AuctionsLost',
  });

  return {
    historyData,
    wonData,
    lostData,
    historyLoading,
    wonLoading,
    lostLoading,
    fetchNextHistoryPage,
    fetchNextWonPage,
    fetchNextLostPage,
    hasNextHistoryPage,
    hasNextWonPage,
    hasNextLostPage,
  };
};
