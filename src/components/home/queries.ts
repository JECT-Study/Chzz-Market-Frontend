import type { PreRegisterProduct, Product } from 'Product';

import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/api/axios';
import { queryKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetBestProducts = () => {
  const getBestProducts = async (): Promise<Product[]> => {
    const response = await httpClient.get(`${API_END_POINT.BEST}`);
    return response.data;
  };

  const { isLoading: isBestLoading, data: bestProducts } = useQuery({
    queryKey: [queryKeys.BEST_PRODUCTS],
    queryFn: () => getBestProducts(),
  });

  return { isBestLoading, bestProducts };
};
export const useGetImminentProducts = () => {
  const getImminentProducts = async (): Promise<Product[]> => {
    const response = await httpClient.get(`${API_END_POINT.IMMINENT}`);
    return response.data;
  };

  const { isLoading: isImminentLoading, data: imminentProducts } = useQuery({
    queryKey: [queryKeys.IMMINENT_PRODUCTS],
    queryFn: () => getImminentProducts(),
  });

  return { isImminentLoading, imminentProducts };
};
export const useGetPreRegisterProducts = () => {
  const getPreRegisterProducts = async (): Promise<PreRegisterProduct[]> => {
    const response = await httpClient.get(`${API_END_POINT.PRE_REGISTER}`);
    return response.data;
  };

  const { isLoading: isPreRegisterLoading, data: preRegisterProducts } =
    useQuery({
      queryKey: [queryKeys.PRE_REGISTER_PRODUCTS],
      queryFn: () => getPreRegisterProducts(),
    });

  return { isPreRegisterLoading, preRegisterProducts };
};
