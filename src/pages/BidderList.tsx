import { LoaderFunction, useLoaderData } from 'react-router-dom';

import BidderListMain from '@/components/bidderList/BidderListMain';
import APIAsyncBoundary from '@/components/common/boundary/APIAsyncBoundary';
import Layout from '@/components/layout/Layout';

const BidderList = () => {
  const auctionId = useLoaderData() as number;

  return (
    <Layout>
      <Layout.Header title='경매 참여자 목록' />
      <APIAsyncBoundary>
        <BidderListMain auctionId={auctionId} />
      </APIAsyncBoundary>
    </Layout>
  );
};

export default BidderList;

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};
