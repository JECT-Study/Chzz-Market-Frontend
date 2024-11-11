import type { IAuctionDetails } from '@/entities';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useEndAuction = () => {
  const queryClient = useQueryClient();

  const endAuction = useCallback(
    async (auctionId: number) => {
      queryClient.setQueryData([QUERY_KEYS.AUCTION_DETAILS, auctionId], (oldData: IAuctionDetails) => {
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
