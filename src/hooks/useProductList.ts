import {
  getOngoingProductList,
  getUpcomingProductList,
} from '@/api/product.api';
import { BASE_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

const useProductList = () => {
  const {
    data: ongoingData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [BASE_KEY.ONGOING_ORDER_LIST],
    queryFn: () => getOngoingProductList(),
  });

  const {
    data: upcomingData,
    isLoading: upcomingLoading,
    error: upcomingError,
  } = useQuery({
    queryKey: [BASE_KEY.UPCOMING_ORDER_LIST],
    queryFn: () => getUpcomingProductList(),
  });

  return {
    ongoingData,
    upcomingData,
  };
};

export default useProductList;
