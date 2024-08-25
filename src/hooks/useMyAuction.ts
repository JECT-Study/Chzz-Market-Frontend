import { getMyAuctionPreRegister } from '@/api/auction.api';
import { BASE_KEY } from '@/constants/queryKey';
import { useInfiniteQuery } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useMyAuction = (): any => {
  const {
    data: myAuctionData,
    error: myAuctionError,
    isLoading: myAuctionLoading,
    isError: myAuctionIsError,
    fetchNextPage: fetchNextMyAuctionPage,
    hasNextPage: hasNextMyAuctionPage,
  } = useInfiniteQuery({
    queryKey: [BASE_KEY.MY_AUCTION],
    queryFn: ({ pageParam = 0 }) => {
      return getMyAuctionPreRegister({ page: pageParam, size: 5 });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.pageNumber + 1 : undefined;
    },
    initialPageParam: 0,
    enabled: true,
  });

  return {
    myAuctionData,
    myAuctionError,
    myAuctionLoading,
    myAuctionIsError,
    fetchNextMyAuctionPage,
    hasNextMyAuctionPage,
  };
};

export default useMyAuction;
