import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { deletePreAuction } from '../api';

export const useDeletePreAuction = (): {
  mutate: UseMutateFunction<any, Error, number, unknown>;
  isPending: boolean;
} => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: deletePreAuction,
    onSuccess: () => {
      navigate('/');
      toast.success('사전 경매가 삭제되었습니다.');
    }
  });

  return { mutate, isPending };
};
