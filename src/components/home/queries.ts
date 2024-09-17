import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/api/axios';
import { queryKeys } from '@/constants/queryKeys';
import type { PreRegisterAuction, RegisterAuction } from 'Auction';
import { UseQueryResult, useSuspenseQueries  } from '@tanstack/react-query';
import { refreshToken } from '../login/queries';

export const useGetHomeAuctions = () => {
  const getBestAuctions = async (): Promise<RegisterAuction[]> => {
    const response = await httpClient.get(`${API_END_POINT.BEST}`);
    return response.data;
  };
  const getImminentAuctions = async (): Promise<RegisterAuction[]> => {
    const response = await httpClient.get(`${API_END_POINT.IMMINENT}`);
    return response.data;
  };
  const getPreRegisterAuctions = async (): Promise<PreRegisterAuction[]> => {
    const response = await httpClient.get(`${API_END_POINT.PRE_REGISTER}`);
    return response.data;
  };

  const [bestAuctionsQuery, imminentAuctionsQuery, preRegisterAuctionsQuery] =
    useSuspenseQueries({
      queries: [
        { queryKey: [queryKeys.BEST_AUCTIONS], queryFn: getBestAuctions },
        {
          queryKey: [queryKeys.IMMINENT_AUCTIONS],
          queryFn: getImminentAuctions,
        },
        {
          queryKey: [queryKeys.PRE_REGISTER_AUCTIONS],
          queryFn: getPreRegisterAuctions,
        },
      ],
    });

  const bestAuctions = bestAuctionsQuery.data;
  const imminentAuctions = imminentAuctionsQuery.data;
  const preRegisterAuctions = preRegisterAuctionsQuery.data;

  return { bestAuctions, imminentAuctions, preRegisterAuctions };
};

export const useRefreshTokenOnSuccess = (): UseQueryResult<void, unknown> => {
  const queryParams = new URLSearchParams(window.location.search);
  const status = queryParams.get('status');

  return useQuery({
    queryKey: [queryKeys.REFRESH_TOKEN, status],
    queryFn: () => refreshToken(),
    enabled: status === 'success',
  });
};
