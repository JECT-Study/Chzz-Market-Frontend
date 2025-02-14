import { useLoaderData } from 'react-router';

import type { IPreAuctionDetails } from '@/entities';
import { useGetAuctionDetails } from '@/features/details';
import { AuctionForm } from '@/shared';

export const EditAuction = () => {
  const auctionId = useLoaderData() as number;
  const { details } = useGetAuctionDetails<IPreAuctionDetails>(auctionId);

  return <AuctionForm preAuction={details} />;
};