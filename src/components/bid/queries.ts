import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/api/axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface IBidData {
  auctionId: number;
  amount: number;
}

export const usePostBid = (
  auctionId: number
): {
  mutate: UseMutateFunction<void, Error, IBidData, unknown>;
} => {
  const postBid = async (bidData: IBidData) => {
    await httpClient.post(API_END_POINT.BID, bidData);
  };

  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: postBid,
    onSuccess: () => {
      toast.success('입찰 성공!');
      navigate(`/auctions/auction/${auctionId}`);
    },
  });

  return { mutate };
};
