import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { ROUTES } from '@/shared';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { patchPreAuction } from '..';

export const usePatchPreAuction = (): {
  mutate: UseMutateFunction<void, Error, { preAuctionId: number; formData: FormData }, unknown>;
  isPending: boolean;
} => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: patchPreAuction,
    onSuccess: (data) => {
      toast.success('사전 경매가 수정되었습니다.');
      navigate(ROUTES.PRE_AUCTION.getItemRoute(data.productId));
    },
  });

  return { mutate, isPending };
};
