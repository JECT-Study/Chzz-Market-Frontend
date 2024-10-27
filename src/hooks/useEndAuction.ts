import { IAuctionDetails } from '@/@types/AuctionDetails';
import { queryKeys } from '@/constants/queryKeys';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useEndAuction = () => {
  const queryClient = useQueryClient();

  const endAuction = useCallback(
    async (auctionId: number) => {
      queryClient.setQueryData([queryKeys.AUCTION_DETAILS, auctionId], (oldData: IAuctionDetails) => {
        return {
          ...oldData,
          status: 'ENDED',
          timeRemaining: 0,
        };
      });
    },
    [queryClient]
  );

  return { endAuction };
};
