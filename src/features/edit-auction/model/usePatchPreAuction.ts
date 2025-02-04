import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import type { IRegisterPatch } from '@/features/register';
import { ROUTES } from '@/shared';
import { patchPreAuction } from '..';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const usePatchPreAuction = (): {
  mutate: UseMutateFunction<
    void,
    Error,
    { preAuctionId: number; submitData: IRegisterPatch },
    unknown
  >;
  isPending: boolean;
} => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: patchPreAuction,
    onSuccess: (data) => {
      toast.success('사전 경매가 수정되었습니다.');
      navigate(ROUTES.PRE_AUCTION.getItemRoute(data.auctionId), {
        replace: true
      });
    }
  });

  return { mutate, isPending };
};
