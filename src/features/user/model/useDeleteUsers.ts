import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { deleteUsers } from '../api/deleteUsers';

export const useDeleteUsers = (): {
  deleteUser: UseMutateFunction<any, Error, void, unknown>;
} => {
  const { mutate: deleteUser } = useMutation({
    mutationFn: deleteUsers
  });

  return { deleteUser };
};
