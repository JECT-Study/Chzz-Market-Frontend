import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import type { IAddressBase } from '@/entities/address/address';
import { ROUTES } from '@/shared/constants/routes';
import { useNavigate } from 'react-router';
import { editAddress } from '../api';

export const useEditAddress = (
  auctionId: string
): {
  mutate: UseMutateFunction<
    any,
    Error,
    { addressId: string; data: IAddressBase },
    unknown
  >;
  isPending: boolean;
} => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      addressId,
      data
    }: {
      addressId: string;
      data: IAddressBase;
    }) => editAddress({ addressId, data }),
    onSuccess: () => {
      navigate(ROUTES.PAYMENT.ADDRESS.getListRoute(auctionId), {
        replace: true
      });
    }
  });

  return { mutate, isPending };
};
