import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { deleteAddress } from '../api';

export const useDeleteAddress = (): {
  deleteData: UseMutateFunction<void, Error, string, unknown>;
} => {
  const { mutate: deleteData } = useMutation({
    mutationFn: deleteAddress
  });

  return { deleteData };
};
