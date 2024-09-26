import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_INFO } from '@/constants/routeInfo';
import Layout from './Layout';
import Navigation from '../navigation/Navigation';

const LayoutWithNav = () => {
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

export default LayoutWithNav;
