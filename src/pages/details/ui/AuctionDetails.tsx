import { LoaderFunction, useLoaderData } from 'react-router-dom';

import { Layout } from '@/app/layout';
import { AuctionDetailsMain } from '@/features/details';
import { APIAsyncBoundary } from '@/shared';

export const AuctionDetails = () => {
  const auctionId = useLoaderData() as number;

  return (
    <Layout>
      <APIAsyncBoundary header='제품 상세'>
        <AuctionDetailsMain auctionId={auctionId} />
      </APIAsyncBoundary>
    </Layout>
  );
};

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};
