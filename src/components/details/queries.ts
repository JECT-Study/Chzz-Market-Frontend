import { API_END_POINT } from '@/constants/api';
import { AuctionItem } from './AuctionItem';
import { httpClient } from '@/api/axios';
import { queryKeys } from '@/constants/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetAuctionDetails = (auctionId: number) => {
  const getAuctionDetails = async (): Promise<AuctionItem> => {
    const response = await httpClient.get(`${API_END_POINT.AUCTIONS}/${auctionId}`);

    return response.data;
  };

  const { data: auctionDetails } = useSuspenseQuery({
    queryKey: [queryKeys.DETAILS, auctionId],
    queryFn: getAuctionDetails,
  });

  return {
    auctionDetails,
  };
};
