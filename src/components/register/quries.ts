import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/api/axios';

export const usePostRegister = (): {
  mutate: UseMutateFunction<unknown, Error, FormData, unknown>;
} => {
  const postRegister = async (formData: FormData) => {
    await httpClient.post(`${API_END_POINT.AUCTIONS}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const { mutate } = useMutation({
    mutationFn: postRegister,
    onSuccess: () => {},
  });

  return { mutate };
};
