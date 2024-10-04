import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const usePostRegister = (): {
  mutate: UseMutateFunction<unknown, Error, FormData, unknown>;
} => {
  const navigate = useNavigate();

  const postRegister = async (formData: FormData) => {
    await httpClient.post(`${API_END_POINT.AUCTIONS}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const { mutate } = useMutation({
    mutationFn: postRegister,
    onSuccess: () => {
      toast.success('경매가 등록되었습니다.');
      navigate('/');
    },
  });

  return { mutate };
};

export const usePatchPreAuction = (): {
  mutate: UseMutateFunction<
    void,
    Error,
    {
      productId: number;
      formData: FormData;
    },
    unknown
  >;
} => {
  const navigate = useNavigate();

  const patchPreAuction = async ({ productId, formData }: { productId: number; formData: FormData }) => {
    await httpClient.patch(`${API_END_POINT.PRE_AUCTION}/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const { mutate } = useMutation({
    mutationFn: patchPreAuction,
    onSuccess: () => {
      toast.success('사전 경매가 수정되었습니다.');
      navigate('/');
    },
  });

  return { mutate };
};
