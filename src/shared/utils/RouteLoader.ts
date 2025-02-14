import { LoaderFunction } from 'react-router';

export const RouteLoader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};
