import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import type { IBidPostData } from '@/features/bid/config/type';
import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { ROUTES } from '@/shared/constants/routes';
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
      navigate(ROUTES.AUCTION.getItemRoute(auctionId), { replace: true });
    },
  });

  return { mutate, isPending };
};
