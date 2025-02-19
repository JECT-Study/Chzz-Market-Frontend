import { useLoaderData } from 'react-router';

import { PreAuctionDetailsMain } from '@/features/details';
import { AsyncBoundary } from '@/shared/ui/boundary/AsyncBoundary';

export const PreAuctionDetails = () => {
  const auctionId = useLoaderData() as number;

  return (
    <AsyncBoundary header="제품 상세">
      <PreAuctionDetailsMain auctionId={auctionId} />
    </AsyncBoundary>
  );
};