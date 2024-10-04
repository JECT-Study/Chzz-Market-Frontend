import { IAuctionDetails, IPreAuctionDetails } from 'AuctionDetails';

import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/api/axios';
import { queryKeys } from '@/constants/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useLikeAuctionItem = () => {
  const likeAuctionItem = async (auctionId: number) => {
    const response = await httpClient.post(
      `${API_END_POINT.PRE_AUCTION}/${auctionId}/likes`
    );
    return response.data;
  };

  return { likeAuctionItem };
};
export const useGetAuctionDetails = (auctionId: number) => {
  const getAuctionDetails = async (): Promise<IAuctionDetails> => {
    const response = await httpClient.get(
      `${API_END_POINT.AUCTIONS}/${auctionId}`
    );

    return response.data;
  };

  const { data: auctionDetails } = useSuspenseQuery({
    queryKey: [queryKeys.AUCTION_DETAILS, auctionId],
    queryFn: getAuctionDetails,
  });

  return {
    auctionDetails,
  };
};

export const useGetPreAuctionDetails = (preAuctionId: number) => {
  const getPreAuctionDetails = async (): Promise<IPreAuctionDetails> => {
    const response = await httpClient.get(
      `${API_END_POINT.PRE_AUCTION}/${preAuctionId}`
    );

    return response.data;
  };

  const { data: preAuctionDetails } = useSuspenseQuery({
    queryKey: [queryKeys.AUCTION_DETAILS, preAuctionId],
    queryFn: getPreAuctionDetails,
  });

  return {
    preAuctionDetails,
  };
};
