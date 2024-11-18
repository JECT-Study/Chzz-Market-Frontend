import { LoaderFunction, useLoaderData } from 'react-router-dom';

import { Layout } from '@/app/layout/index';
import SettlementMain from '@/pages/settlement/ui/SettlementMain';
import { APIAsyncBoundary } from '@/shared';

export const Settlement = () => {
  const auctionId = useLoaderData() as number;

  return (
    <Layout>
      <Layout.Header title='경매 참여자 목록' />
      <APIAsyncBoundary>
        <SettlementMain auctionId={auctionId} />
      </APIAsyncBoundary>
    </Layout>
  );
};

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};
