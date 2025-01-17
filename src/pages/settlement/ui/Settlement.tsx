import { LoaderFunction, useLoaderData } from 'react-router-dom';

import { Layout } from '@/app/layout';
import { AsyncBoundary } from '@/shared';
import SettlementMain from './SettlementMain';

export const Settlement = () => {
  const auctionId = useLoaderData() as number;

  return (
    <Layout>
      <Layout.Header title='경매 참여자 목록' />
      <AsyncBoundary>
        <SettlementMain auctionId={auctionId} />
      </AsyncBoundary>
    </Layout>
  );
};

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};
