import { useLoaderData } from 'react-router';

import { AsyncBoundary } from '@/shared/ui/boundary/AsyncBoundary';
import { BidderListMain } from './BidderListMain';

export const BidderList = () => {
  const auctionId = useLoaderData() as number;

  return (
    <AsyncBoundary header="경매 참여자 목록">
      <BidderListMain auctionId={auctionId} />
    </AsyncBoundary>
  );
};