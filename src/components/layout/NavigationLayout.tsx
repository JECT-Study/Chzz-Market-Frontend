import { Outlet, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Navigation from '../navigation/Navigation';
import { useNavigationContext } from '../navigation/NavigationContext';

const NavigationLayout = () => {
  const navigate = useNavigate();
  const {
    navigationState: { title, active },
  } = useNavigationContext();

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate(-1)}>{title}</Layout.Header>
      <Layout.Main>
        <Outlet />
      </Layout.Main>
      <Layout.Footer type="single">
        <Navigation active={active} />
      </Layout.Footer>
    </Layout>
  );
};

export default NavigationLayout;
