import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import type { IUser } from '@/entities/user/user';
import { useNavigate } from 'react-router';
import { postSignup } from '../api/postSignup';

export const usePostSignup = (): {
  signupMutation: UseMutateFunction<any, Error, IUser, unknown>;
  isPending: boolean;
} => {
  const navigate = useNavigate();

  const { mutate: signupMutation, isPending } = useMutation({
    mutationFn: (data: IUser) => postSignup(data),
    onSuccess: () => {
      navigate('/');
    }
  });

  return { signupMutation, isPending };
};
