import { LoaderFunction, useLoaderData } from 'react-router-dom';

import Layout from '@/components/layout/Layout';

import BidMain from '@/components/bid/BidMain';
import APIAsyncBoundary from '@/components/common/boundary/APIAsyncBoundary';

const Bid = () => {
  const auctionId = useLoaderData() as number;

  return (
    <Layout>
      <Layout.Header title='경매 참여하기' />
      <APIAsyncBoundary>
        <BidMain auctionId={auctionId} />
      </APIAsyncBoundary>
    </Layout>
  );
};

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};

export default Bid;
