import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import type { IRegisterPatch } from '@/features/register/config/type';
import { ROUTES } from '@/shared/constants/routes';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { patchPreAuction } from '../api/patchPreAuction';

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
