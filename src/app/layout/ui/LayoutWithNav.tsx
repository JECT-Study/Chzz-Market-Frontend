import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Layout } from '@/app/layout/index';
import { Navigation } from '.';
import { ROUTE_INFO } from '../config';

export const LayoutWithNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { title, active } = ROUTE_INFO[pathname];

  return (
    <Layout>
      <Layout.Header title={title} handleBack={() => navigate(-1)} />
      <Layout.Main>
        <Outlet />
      </Layout.Main>
      <Layout.Footer type="single">
        <Navigation active={active} />
      </Layout.Footer>
    </Layout>
  );
};