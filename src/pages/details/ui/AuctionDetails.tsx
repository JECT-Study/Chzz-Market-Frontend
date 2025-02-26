import { useLoaderData } from 'react-router';

import { AuctionDetailsMain } from '@/features/details/ui/AuctionDetailsMain';
import { AsyncBoundary } from '@/shared/ui/boundary/AsyncBoundary';

export const AuctionDetails = () => {
  const auctionId = useLoaderData() as number;

  return (
    <AsyncBoundary header="제품 상세">
      <AuctionDetailsMain auctionId={auctionId} />
    </AsyncBoundary>
  );
};


