import { LoaderFunction, useLoaderData } from 'react-router-dom';

import { Layout } from '@/app/layout';
import { AuctionDetailsMain } from '@/features/details';
import { AsyncBoundary } from '@/shared';

export const AuctionDetails = () => {
  const auctionId = useLoaderData() as number;

  return (
    <Layout>
      <AsyncBoundary header='제품 상세'>
        <AuctionDetailsMain auctionId={auctionId} />
      </AsyncBoundary>
    </Layout>
  );
};

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};
