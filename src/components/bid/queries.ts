import { API_END_POINT } from '@/constants/api';
import type { BidProduct } from 'Product';
import { httpClient } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';

export const useGetBidProductDetails = (auctionId: number) => {
  const getBidProductDetails = async (): Promise<BidProduct> => {
    const response = await httpClient.get(
      `http://localhost:3000${API_END_POINT.DETAILS}/${auctionId}`,
    );

    return response.data;
  };

  const { isLoading, data: productDetails } = useQuery({
    queryKey: [queryKeys.DETAILS],
    queryFn: () => getBidProductDetails(),
  });

  return {
    isLoading,
    productDetails,
  };
};
