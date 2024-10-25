import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import type { IBidPostData } from '@/@types/Bid';
import { httpClient } from '@/api/axios';
import { API_END_POINT } from '@/constants/api';
import ROUTES from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const usePostBid = (
  auctionId: number
): {
  mutate: UseMutateFunction<void, Error, IBidPostData, unknown>;
  isPending: boolean;
} => {
  const postBid = async (bidData: IBidPostData) => {
    await httpClient.post(API_END_POINT.BID, bidData);
    return;
  };

  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: postBid,
    onSuccess: () => {
      toast.success('입찰 성공!');
      navigate(ROUTES.getAuctionItemRoute(auctionId), { replace: true });
    },
  });

  return { mutate, isPending };
};
