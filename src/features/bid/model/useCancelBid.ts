import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared';
import { toast } from 'sonner';
import { cancelBid } from '../api';

export const useCancelBid = (): {
  mutate: UseMutateFunction<any, Error, number, unknown>;
  isPending: boolean;
} => {
  const queryClient = useQueryClient();

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
