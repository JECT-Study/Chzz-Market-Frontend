import { LoaderFunction, useLoaderData } from 'react-router-dom';

import { AsyncBoundary } from '@/shared';
import SettlementMain from './SettlementMain';

export const Settlement = () => {
  const auctionId = useLoaderData() as number;

  return (
    <AsyncBoundary>
      <SettlementMain auctionId={auctionId} />
    </AsyncBoundary>
  );
};

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};
