import Layout from '@/components/Layout';
import UserOrder from '@/components/user/UserOrder';
import UserOrderList from '@/components/user/UserOrderList';
import UserProfile from '@/components/user/UserProfile';
import Navigation from '@/components/Navigation';
import LoginProvider from '@/provider/loginProvider';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();

  return (
    <LoginProvider>
      <Layout>
        <Layout.Header handleBack={() => navigate('/')}>
          마이페이지
        </Layout.Header>
        <Layout.Main>
          <div className="flex flex-col">
            <UserProfile />
            <UserOrder />
            <UserOrderList />
          </div>

          <button onClick={() => navigate('/product/list')}>
            상품 목록으로 이동
          </button>
        </Layout.Main>
        <Layout.Footer type="single">
          <Navigation active="my" />
        </Layout.Footer>
      </Layout>
    </LoginProvider>
  );
};

export default User;
