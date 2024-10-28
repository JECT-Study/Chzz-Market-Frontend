import { getMyHistoryAuction, getMyLostAuction, getMyWonAuction } from '@/components/userAuction/queries';

import { queryKeys } from '@/constants/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useHistory = (activeTab: string): any => {
  const {
    data: historyData,
    isLoading: historyLoading,
    error: _historyError,
    fetchNextPage: fetchNextHistoryPage,
    hasNextPage: hasNextHistoryPage,
    refetch: refetchHistoryData,
  } = useInfiniteQuery({
    queryKey: [queryKeys.AUCTION_HISTORY],
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
    refetch: refetchWonData,
  } = useInfiniteQuery({
    queryKey: [queryKeys.AUCTION_WON],
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
    refetch: refetchLostData,
  } = useInfiniteQuery({
    queryKey: [queryKeys.AUCTION_LOST],
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
    refetchHistoryData,
    refetchWonData,
    refetchLostData,
  };
};

export default useHistory;
