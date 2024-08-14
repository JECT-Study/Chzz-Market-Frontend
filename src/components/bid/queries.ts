import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import type { Product } from 'Product';
import { queryKeys } from '../queryKeys';

export const useGetProductDetails = (auctionId: number) => {
  const getProductDetails = async (): Promise<Product> => {
    const response = await httpClient.get(
      `http://localhost:3000${API_END_POINT.DETAILS}/${auctionId}`,
    );

    return response.data;
  };

  const { isLoading, data: productDetails } = useQuery({
    queryKey: [queryKeys.DETAILS],
    queryFn: () => getProductDetails(),
  });

  return {
    isLoading,
    productDetails,
  };
};
