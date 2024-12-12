import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { IRegisterPost } from '..';
import { postAuction } from '../api';

export const usePostAuction = (): {
  mutate: UseMutateFunction<unknown, Error, IRegisterPost, unknown>;
  isPending: boolean;
} => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: postAuction,
    onSuccess: () => {
      toast.success('경매가 등록되었습니다.');
      navigate('/');
    },
  });

  return { mutate, isPending };
};
