import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Layout } from '@/app/layout/index';
import { HiOutlineSearch } from "react-icons/hi";
import { Navigation } from '.';
import { ROUTE_INFO } from '../config';

export const LayoutWithNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { title, active } = ROUTE_INFO[pathname];


  return (
    <Layout>
      <Layout.Header title={title} handleBack={() => navigate(-1)}
        option={pathname === '/'
          ?
          <button
            aria-label='옵션'
            className='absolute right-2'
            onClick={() => navigate('/auctions/search')}
          >
            <HiOutlineSearch size={25} />
          </button>
          : null} />
      <Layout.Main>
        <Outlet />
      </Layout.Main>
      <Layout.Footer type="single">
        <Navigation active={active} />
      </Layout.Footer>
    </Layout>
  );
};