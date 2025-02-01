import { LoaderFunction, useLoaderData } from 'react-router-dom';

import { AuctionForm } from '@/shared';
import type { IPreAuctionDetails } from '@/entities';
import { useGetAuctionDetails } from '@/features/details';

export const EditAuction = () => {
  const auctionId = useLoaderData() as number;
  const { details } = useGetAuctionDetails<IPreAuctionDetails>(auctionId);

  return <AuctionForm preAuction={details} />;
};

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};
