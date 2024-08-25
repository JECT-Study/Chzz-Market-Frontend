import { API_END_POINT } from '@/constants/api';
import type { BidProduct } from 'Product';
import { httpClient } from '@/api/axios';
import { queryKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

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
