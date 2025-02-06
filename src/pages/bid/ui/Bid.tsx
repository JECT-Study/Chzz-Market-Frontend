import { LoaderFunction, useLoaderData } from 'react-router';

import { BidForm } from '@/features/bid';
import { AsyncBoundary } from '@/shared';

export const Bid = () => {
  const auctionId = useLoaderData() as number;

  return (
    <AsyncBoundary header="경매 참여하기">
      <BidForm auctionId={auctionId} />
    </AsyncBoundary>
  );
};

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};
