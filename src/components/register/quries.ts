import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: postRegister,
    onSuccess: () => navigate('/'),
    onError: (error) => toast(error.message),
  });

  return { mutate };
};
