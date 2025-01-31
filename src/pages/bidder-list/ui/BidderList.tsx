import { LoaderFunction, useLoaderData } from 'react-router-dom';

import { AsyncBoundary } from '@/shared';
import { BidderListMain } from './BidderListMain';

export const BidderList = () => {
  const auctionId = useLoaderData() as number;

  return (
    <AsyncBoundary header="경매 참여자 목록">
      <BidderListMain auctionId={auctionId} />
    </AsyncBoundary>
  );
};

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};
