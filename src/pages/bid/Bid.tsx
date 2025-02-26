import { useLoaderData } from 'react-router';

import { BidForm } from '@/features/bid/ui/BidForm';
import { AsyncBoundary } from '@/shared/ui/boundary/AsyncBoundary';

export const Bid = () => {
  const auctionId = useLoaderData() as number;

  return (
    <AsyncBoundary header="경매 참여하기">
      <BidForm auctionId={auctionId} />
    </AsyncBoundary>
  );
};