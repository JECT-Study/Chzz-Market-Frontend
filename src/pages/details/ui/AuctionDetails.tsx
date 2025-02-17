import { useLoaderData } from 'react-router';

import { AuctionDetailsMain } from '@/features/details';
import { AsyncBoundary } from '@/shared';

export const AuctionDetails = () => {
  const auctionId = useLoaderData() as number;

  return (
    <AsyncBoundary header="제품 상세">
      <AuctionDetailsMain auctionId={auctionId} />
    </AsyncBoundary>
  );
};


