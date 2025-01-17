import { LoaderFunction, useLoaderData } from 'react-router-dom';

import { AuctionDetailsMain } from '@/features/details';
import { AsyncBoundary } from '@/shared';

export const AuctionDetails = () => {
  const auctionId = useLoaderData() as number;

  return (
    <AsyncBoundary header='제품 상세'>
      <AuctionDetailsMain auctionId={auctionId} />
    </AsyncBoundary>
  );
};

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};
