import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { postAuction } from '../api/postAuction';
import type { IRegisterPost } from '../config/type';

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
    }
  });

  return { mutate, isPending };
};
