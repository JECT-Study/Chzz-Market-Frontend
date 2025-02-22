import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { ROUTES } from '@/shared/constants/routes';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { convertAuction } from '../api/convertAuction';

export const useConvertAuction = (
  preAuctionId: number
): {
  mutate: UseMutateFunction<any, Error, void, unknown>;
  isPending: boolean;
} => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () => convertAuction(preAuctionId),
    onSuccess: () => {
      navigate(ROUTES.AUCTION.getItemRoute(preAuctionId), { replace: true });
      toast.success('경매로 전환되었습니다.');
    }
  });

  return { mutate, isPending };
};
