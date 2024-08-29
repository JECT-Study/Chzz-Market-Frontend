import Layout from '@/components/Layout';
import MyPageOrder from '@/components/mypage/MyPageOrder';
import MyPageOrderList from '@/components/mypage/MyPageOrderList';
import MyPageProfile from '@/components/mypage/MyPageProfile';
import Navigation from '@/components/Navigation';
import LoginProvider from '@/provider/loginProvider';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <LoginProvider>
      <Layout>
        <Layout.Header handleBack={() => navigate('/')}>
          마이페이지
        </Layout.Header>
        <Layout.Main>
          <div className="flex flex-col">
            <MyPageProfile />
            <MyPageOrder />
            <MyPageOrderList />
          </div>
        </Layout.Main>
        <Layout.Footer type="single">
          <Navigation active="my" />
        </Layout.Footer>
      </Layout>
    </LoginProvider>
  );
};

export default MyPage;
