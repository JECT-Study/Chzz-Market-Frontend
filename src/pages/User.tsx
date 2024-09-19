import Layout from '@/components/layout/Layout';
import UserOrder from '@/components/user/UserOrder';
import UserOrderList from '@/components/user/UserOrderList';
import UserProfile from '@/components/user/UserProfile';
import Navigation from '@/components/navigation/Navigation';
import LoginProvider from '@/provider/loginProvider';
import { useNavigate } from 'react-router-dom';
import FindAddressButton from '@/components/address/FIndAddressButton';
import { useState } from 'react';

const User = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<{
    roadAddress: string;
    jibun: string;
    zonecode: string;
  }>({
    roadAddress: '',
    jibun: '',
    zonecode: '',
  });

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
        </Layout.Main>
        <Layout.Footer type="single">
          <Navigation active="my" />
        </Layout.Footer>
      </Layout>
    </LoginProvider>
  );
};

export default User;
