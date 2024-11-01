import { LoaderFunction, useLoaderData } from 'react-router-dom';

import { Layout } from '@/app/layout/index';
import BidMain from '@/components/bid/BidMain';
import { APIAsyncBoundary } from "@/shared";

export const Bid = () => {
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