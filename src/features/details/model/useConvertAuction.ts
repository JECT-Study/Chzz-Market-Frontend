import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { ROUTES } from '@/shared';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { convertAuction } from '../api';

export const useConvertAuction = (): {
  mutate: UseMutateFunction<any, Error, number, unknown>;
  isPending: boolean;
} => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: convertAuction,
    onSuccess: (data) => {
      navigate(ROUTES.AUCTION.getItemRoute(data.auctionId), { replace: true });
      toast.success('경매로 전환되었습니다.');
    },
  });

  return { mutate, isPending };
};
