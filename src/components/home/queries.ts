import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@/utils/axios';
import type { PreEnrollProduct, Product } from 'Product';
import { API_END_POINT } from '@/constants/api';
import { queryKeys } from '../queryKeys';

export const useGetBestProducts = () => {
  const getBestProducts = async (): Promise<Product[]> => {
    const response = await httpClient.get(
      `http://localhost:3000${API_END_POINT.BEST}`,
    );
    return response.data;
  };

  const { isLoading: isBestLoading, data: bestItems } = useQuery({
    queryKey: [queryKeys.BEST_PRODUCTS],
    queryFn: () => getBestProducts(),
  });

  return { isBestLoading, bestItems };
};
export const useGetDeadlineProducts = () => {
  const getDeadlineProducts = async (): Promise<Product[]> => {
    const response = await httpClient.get(
      `http://localhost:3000${API_END_POINT.DEADLINE}`,
    );
    return response.data;
  };

  const { isLoading: isDeadlineLoading, data: deadlineItems } = useQuery({
    queryKey: [queryKeys.DEADLINE_PRODUCTS],
    queryFn: () => getDeadlineProducts(),
  });

  return { isDeadlineLoading, deadlineItems };
};
export const useGetPreEnrollProducts = () => {
  const getPreEnrollProducts = async (): Promise<PreEnrollProduct[]> => {
    const response = await httpClient.get(
      `http://localhost:3000${API_END_POINT.PRE_ENROLL}`,
    );
    return response.data;
  };

  const { isLoading: isPreEnrollLoading, data: preEnrollItems } = useQuery({
    queryKey: [queryKeys.PRE_ENROLL_PRODUCTS],
    queryFn: () => getPreEnrollProducts(),
  });

  return { isPreEnrollLoading, preEnrollItems };
};
