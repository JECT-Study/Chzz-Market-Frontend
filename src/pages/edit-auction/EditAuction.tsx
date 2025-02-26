import { useLoaderData } from 'react-router';

import type { IPreAuctionDetails } from '@/entities/auction/types/details';
import { useGetAuctionDetails } from '@/features/details/model/useGetAuctionDetails';
import { AuctionForm } from '@/shared/ui/AuctionForm';

export const EditAuction = () => {
  const auctionId = useLoaderData() as number;
  const { details } = useGetAuctionDetails<IPreAuctionDetails>(auctionId);

  return <AuctionForm preAuction={details} />;
};