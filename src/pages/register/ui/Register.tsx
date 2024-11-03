import { LoaderFunction, useLoaderData } from 'react-router-dom';

import { Layout } from '@/app/layout/index';
import { RegisterForm } from '@/features/register';

export const Register = () => {
  const preAuctionId = useLoaderData() as number;

  return (
    <Layout>
      <RegisterForm preAuctionId={preAuctionId} />
    </Layout>
  );
};

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { preAuctionId } = params;

  return preAuctionId;
};
