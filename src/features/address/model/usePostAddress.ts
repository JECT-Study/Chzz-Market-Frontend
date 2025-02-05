import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import type { IAddressBase } from '@/entities/address/address';
import { ROUTES } from '@/shared';
import { useNavigate } from 'react-router';
import { addAddress } from '../api';

export const usePostAddress = (
  auctionId: string
): {
  mutate: UseMutateFunction<any, Error, IAddressBase, unknown>;
  isPending: boolean;
} => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      navigate(ROUTES.PAYMENT.ADDRESS.getListRoute(auctionId), {
        replace: true
      });
    }
  });

  return { mutate, isPending };
};
