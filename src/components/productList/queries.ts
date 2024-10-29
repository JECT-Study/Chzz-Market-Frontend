import { IAuctionList, IPreAuctionList } from '@/@types/AuctionList';

import { httpClient } from '@/api/axios';
import { API_END_POINT } from '@/constants/api';
import { queryKeys } from '@/constants/queryKeys';
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export interface GetProductParams {
  pageNumber: number;
  pageSize: number;
  sortType?: string;
  category?: string;
}

export const getOngoingProductList = async ({ pageNumber, pageSize, sortType = 'newest', category = 'all' }: GetProductParams): Promise<IAuctionList> => {
  const response = await httpClient.get(`${API_END_POINT.AUCTIONS}?category=${category}&sort=${sortType}&page=${pageNumber}&size=${pageSize}`);
  return response.data;
};

export const getEnrollProductList = async ({ pageNumber, pageSize, sortType = 'newest', category = 'all' }: GetProductParams): Promise<IPreAuctionList> => {
  const response = await httpClient.get(`${API_END_POINT.PRE_AUCTION}?category=${category}&page=${pageNumber}&size=${pageSize}&sort=${sortType}`);
  return response.data;
};

export const useToggleAuctionListHeart = (): {
  mutate: UseMutateFunction<any, Error, number, unknown>;
} => {
  const heartAuctionItem = async (preAuctionId: number): Promise<{ isLiked: boolean; likeCount: number }> => {
    const response = await httpClient.post(`${API_END_POINT.PRE_AUCTION}/${preAuctionId}/likes`);

    return response.data;
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: heartAuctionItem,
    onSuccess: (data, preAuctionId) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PRE_AUCTION_HEART_LIST],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PRE_AUCTION_DETAILS, preAuctionId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PRE_AUCTION_LIST],
      });
      if (data.isLiked) toast.success('찜 목록에 추가되었습니다.');
      else toast.success('찜 목록에서 제외되었습니다.');
    },
  });

  return { mutate };
};
