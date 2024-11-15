import { LoaderFunction, useLoaderData } from 'react-router-dom';

import { APIAsyncBoundary } from '@/shared';
import { AuctionDetailsMain } from '@/features/details';
import { Layout } from '@/app/layout';

export const AuctionDetails = () => {
  const auctionId = useLoaderData() as number;

  return (
    <Layout>
      <Layout.Header title='제품 상세' />
      <APIAsyncBoundary>
        <AuctionDetailsMain auctionId={auctionId} />
      </APIAsyncBoundary>
    </Layout>
  );
};

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};
