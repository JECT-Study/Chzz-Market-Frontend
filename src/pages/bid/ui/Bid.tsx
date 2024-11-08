import { LoaderFunction, useLoaderData } from 'react-router-dom';

import { Layout } from '@/app/layout';
import { BidForm } from '@/features/bid';
import { APIAsyncBoundary } from "@/shared";

export const Bid = () => {
  const auctionId = useLoaderData() as number;

  return (
    <Layout>
      <Layout.Header title='경매 참여하기' />
      <APIAsyncBoundary>
        <BidForm auctionId={auctionId} />
      </APIAsyncBoundary>
    </Layout>
  );
};

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};