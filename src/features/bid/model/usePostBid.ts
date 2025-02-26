import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { ROUTES } from '@/shared/constants/routes';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { postBid } from '../api/postBid';
import type { IBidPostData } from '../config/type';

export const usePostBid = (
  auctionId: number
): {
  mutate: UseMutateFunction<void, Error, IBidPostData, unknown>;
  isPending: boolean;
} => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: postBid,
    onSuccess: () => {
      toast.success('입찰 성공!');
      navigate(ROUTES.AUCTION.getItemRoute(auctionId), { replace: true });
    }
  });

  return { mutate, isPending };
};
