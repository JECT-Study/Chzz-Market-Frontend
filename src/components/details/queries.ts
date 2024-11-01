import type { IAuctionDetails, IPreAuctionDetails } from '@/@types/AuctionDetails';
import { UseMutateFunction, useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { ROUTES } from '@/shared/constants/routes';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useConvertAuction = (): {
  mutate: UseMutateFunction<any, Error, number, unknown>;
  isPending: boolean;
} => {
  const navigate = useNavigate();

  const convertAuction = async (preAuctionId: number) => {
    const response = await httpClient.post(`${API_END_POINT.AUCTION}/start`, preAuctionId);

    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: convertAuction,
    onSuccess: (data) => {
      navigate(ROUTES.AUCTION.getItemRoute(data.auctionId), { replace: true });
      toast.success('경매로 전환되었습니다.');
    },
  });

  return { mutate, isPending };
};

export const useToggleAuctionDetailsHeart = (): {
  mutate: UseMutateFunction<any, Error, number, unknown>;
} => {
  const heartAuctionItem = async (preAuctionId: number): Promise<{ isLiked: boolean; likeCount: number }> => {
    const response = await httpClient.post(`${API_END_POINT.PRE_AUCTION}/${preAuctionId}/likes`);

    return response.data;
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: heartAuctionItem,
    onMutate: async (preAuctionId: number) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.PRE_AUCTION_DETAILS, preAuctionId] });

      const previousData = queryClient.getQueryData([QUERY_KEYS.PRE_AUCTION_DETAILS, preAuctionId]);

      queryClient.setQueryData([QUERY_KEYS.PRE_AUCTION_DETAILS, preAuctionId], (oldData: IPreAuctionDetails) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          isLiked: !oldData.isLiked,
          likeCount: oldData.isLiked ? oldData.likeCount - 1 : oldData.likeCount + 1,
        };
      });

      return { previousData };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PRE_AUCTION_HEART_LIST],
      });
      if (data.isLiked) toast.success('좋아요 추가되었습니다.');
      else toast.success('좋아요 취소되었습니다.');
    },
    onError: (_err, preAuctionId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([QUERY_KEYS.PRE_AUCTION_DETAILS, preAuctionId], context.previousData);
      }
    },
    onSettled: (_res, _err, preAuctionId: number) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PRE_AUCTION_DETAILS, preAuctionId],
      });
    },
  });

  return { mutate };
};

export const useCancelBid = (): {
  mutate: UseMutateFunction<any, Error, number, unknown>;
  isPending: boolean;
} => {
  const queryClient = useQueryClient();

  const cancelBid = async (bidId: number) => {
    await httpClient.patch(`${API_END_POINT.BID}/${bidId}/cancel`);
    return;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: cancelBid,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AUCTION_DETAILS],
      });
      toast.success('경매 참여를 취소했습니다.');
    },
  });

  return { mutate, isPending };
};

export const useGetAuctionDetails = (auctionId: number): { auctionDetails: IAuctionDetails } => {
  const getAuctionDetails = async (): Promise<IAuctionDetails> => {
    const response = await httpClient.get(`${API_END_POINT.AUCTION}/${auctionId}`);

    return response.data;
  };

  const { data: auctionDetails } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.AUCTION_DETAILS, auctionId],
    queryFn: getAuctionDetails,
  });

  return {
    auctionDetails,
  };
};

export const useGetPreAuctionDetails = (preAuctionId: number | undefined) => {
  const getPreAuctionDetails = async (): Promise<IPreAuctionDetails> => {
    const response = await httpClient.get(`${API_END_POINT.PRE_AUCTION}/${preAuctionId}`);

    return response.data;
  };

  const { data: preAuctionDetails } = useQuery({
    queryKey: [QUERY_KEYS.PRE_AUCTION_DETAILS, preAuctionId],
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
    queryKey: [QUERY_KEYS.PRE_AUCTION_DETAILS, preAuctionId],
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
