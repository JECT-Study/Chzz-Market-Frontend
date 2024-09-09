import { API_END_POINT } from '@/constants/api';
import type { ProductDetails } from 'Product';
import { httpClient } from '@/api/axios';
import { queryKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetProductDetails = (auctionId: number) => {
  const getProductDetails = async (): Promise<ProductDetails> => {
    const response = await httpClient.get(
      `${API_END_POINT.DETAILS}/${auctionId}`,
    );

    return response.data;
  };

  const { isLoading, data: productDetails } = useQuery({
    queryKey: [queryKeys.DETAILS, auctionId],
    queryFn: () => getProductDetails(),
  });

  return {
    isLoading,
    productDetails,
  };
};
