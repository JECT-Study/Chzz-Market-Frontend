import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { ROUTES } from '@/shared/constants/routes';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { patchPreAuction } from '../api/index';

export const usePatchPreAuction = (
  preAuctionId: number
): {
  mutate: UseMutateFunction<void, Error, { preAuctionId: number; formData: FormData }, unknown>;
  isPending: boolean;
} => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: patchPreAuction,
    onSuccess: () => {
      toast.success('사전 경매가 수정되었습니다.');
      navigate(ROUTES.PRE_AUCTION.getItemRoute(preAuctionId));
    },
  });

  return { mutate, isPending };
};
