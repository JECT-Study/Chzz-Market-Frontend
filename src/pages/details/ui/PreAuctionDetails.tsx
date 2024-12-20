import { LoaderFunction, useLoaderData } from 'react-router-dom';

import { Layout } from '@/app/layout';
import { PreAuctionDetailsMain } from "@/features/details";
import { APIAsyncBoundary } from '@/shared';

export const PreAuctionDetails = () => {
  const preAuctionId = useLoaderData() as number;

  return (
    <Layout>
      <APIAsyncBoundary header='제품 상세'>
        <PreAuctionDetailsMain preAuctionId={preAuctionId} />
      </APIAsyncBoundary>
    </Layout >)
}

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { preAuctionId } = params;

  return preAuctionId;
};
