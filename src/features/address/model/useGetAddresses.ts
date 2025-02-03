import { QUERY_KEYS } from '@/shared';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery
} from '@tanstack/react-query';
import { getAddresses } from '../api';

export const useGetAddresses = (): {
  addressData: any;
  refetchAddresses: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
} => {
  const { data: addressData, refetch: refetchAddresses } = useQuery({
    queryKey: [QUERY_KEYS.ADDRESSES],
    queryFn: () => getAddresses()
  });

  return { addressData, refetchAddresses };
};
