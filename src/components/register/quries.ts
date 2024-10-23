import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { httpClient } from '@/api/axios';
import { API_END_POINT } from '@/constants/api';
import ROUTES from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const usePostRegister = (): {
  mutate: UseMutateFunction<unknown, Error, FormData, unknown>;
  isPending: boolean;
} => {
  const navigate = useNavigate();

  const postRegister = async (formData: FormData) => {
    await httpClient.post(`${API_END_POINT.AUCTIONS}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: postRegister,
    onSuccess: () => {
      toast.success('경매가 등록되었습니다.');
      navigate('/');
    },
  });

  return { mutate, isPending };
};

export const usePatchPreAuction = (
  preAuctionId: number
): {
  mutate: UseMutateFunction<void, Error, FormData, unknown>;
  isPending: boolean;
} => {
  const navigate = useNavigate();

  const patchPreAuction = async (formData: FormData) => {
    await httpClient.patch(`${API_END_POINT.PRE_AUCTION}/${preAuctionId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: patchPreAuction,
    onSuccess: () => {
      toast.success('사전 경매가 수정되었습니다.');
      navigate(ROUTES.getPreAuctionItemRoute(preAuctionId));
    },
  });

  return { mutate, isPending };
};
