import type { IAuctionDetails, IPreAuctionDetails } from '@/@types/AuctionDetails';
import { QueryObserverResult, RefetchOptions, UseMutateFunction, useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/api/axios';
import { queryKeys } from '@/constants/queryKeys';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useConvertAuction = (): {
  mutate: UseMutateFunction<any, Error, number, unknown>;
  isPending: boolean;
} => {
  const navigate = useNavigate();

  const convertAuction = async (productId: number) => {
    const response = await httpClient.post(`${API_END_POINT.AUCTIONS}/start`, productId);

    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: convertAuction,
    onSuccess: (data) => {
      navigate(`/auctions/auction/${data.auctionId}`, { replace: true });
      toast.success('경매로 전환되었습니다.');
    },
  });

  return { mutate, isPending };
};

export const useLikeAuctionItem = (): {
  mutate: UseMutateFunction<any, Error, number, unknown>;
} => {
  const likeAuctionItem = async (auctionId: number) => {
    await httpClient.post(`${API_END_POINT.PRE_AUCTION}/${auctionId}/likes`);
    return;
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: likeAuctionItem,
    onMutate: async (auctionId: number) => {
      await queryClient.cancelQueries({ queryKey: [queryKeys.PRE_AUCTION_DETAILS, auctionId] });

      const previousData = queryClient.getQueryData([queryKeys.PRE_AUCTION_DETAILS, auctionId]);

      queryClient.setQueryData([queryKeys.PRE_AUCTION_DETAILS, auctionId], (oldData: IPreAuctionDetails) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          isLiked: !oldData.isLiked,
          likeCount: oldData.isLiked ? oldData.likeCount - 1 : oldData.likeCount + 1,
        };
      });

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PRE_AUCTION_HEART_LIST],
      });
    },
    onError: (_err, auctionId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([queryKeys.PRE_AUCTION_DETAILS, auctionId], context.previousData);
      }
    },
    onSettled: (_res, _err, auctionId: number) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PRE_AUCTION_DETAILS, auctionId],
      });
    },
  });

  return { mutate };
};

export const useCancelBid = (): {
  mutate: UseMutateFunction<any, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();

  const cancelBid = async (bidId: number) => {
    await httpClient.patch(`${API_END_POINT.BID}/${bidId}/cancel`);
    return;
  };

  const { mutate } = useMutation({
    mutationFn: cancelBid,
    onSuccess: () => {
      toast.success('경매 참여를 취소했습니다.');
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUCTION_DETAILS],
      });
    },
  });

  return { mutate };
};

export const useGetAuctionDetails = (
  auctionId: number
): { auctionDetails: IAuctionDetails; refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<IAuctionDetails, Error>> } => {
  const getAuctionDetails = async (): Promise<IAuctionDetails> => {
    const response = await httpClient.get(`${API_END_POINT.AUCTIONS}/${auctionId}`);

    return response.data;
  };

  const { data: auctionDetails, refetch } = useSuspenseQuery({
    queryKey: [queryKeys.AUCTION_DETAILS, auctionId],
    queryFn: getAuctionDetails,
  });

  return {
    auctionDetails,
    refetch,
  };
};

export const useGetPreAuctionDetails = (preAuctionId: number | undefined) => {
  const getPreAuctionDetails = async (): Promise<IPreAuctionDetails> => {
    const response = await httpClient.get(`${API_END_POINT.PRE_AUCTION}/${preAuctionId}`);

    return response.data;
  };

  const { data: preAuctionDetails } = useQuery({
    queryKey: [queryKeys.PRE_AUCTION_DETAILS, preAuctionId],
    queryFn: getPreAuctionDetails,
    enabled: preAuctionId === undefined ? false : true,
  });

  return {
    preAuctionDetails,
  };
};

export const useGetPreAuctionDetailsWithSuspense = (preAuctionId: number) => {
  const getPreAuctionDetails = async (): Promise<IPreAuctionDetails> => {
    const response = await httpClient.get(`${API_END_POINT.PRE_AUCTION}/${preAuctionId}`);

    return response.data;
  };

  const { data: preAuctionDetails } = useSuspenseQuery({
    queryKey: [queryKeys.PRE_AUCTION_DETAILS, preAuctionId],
    queryFn: getPreAuctionDetails,
  });

  return {
    preAuctionDetails,
  };
};

export const useDeletePreAuction = (): {
  mutate: UseMutateFunction<any, Error, number, unknown>;
  isPending: boolean;
} => {
  const navigate = useNavigate();

  const deletePreAuction = async (preAuctionId: number) => {
    await httpClient.delete(`${API_END_POINT.PRE_AUCTION}/${preAuctionId}`);
    return;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: deletePreAuction,
    onSuccess: () => {
      navigate('/');
      toast.success('사전 경매가 삭제되었습니다.');
    },
  });

  return { mutate, isPending };
};
