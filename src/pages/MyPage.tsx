import Layout from '@/components/Layout';
import MyPageOrder from '@/components/mypage/MyPageOrder';
import MyPageOrderList from '@/components/mypage/MyPageOrderList';
import MyPageProfile from '@/components/mypage/MyPageProfile';
import Navigation from '@/components/Navigation';
import { useLocation, useNavigate } from 'react-router-dom';

const MyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const formData = location.state?.formData;
  console.log(formData);

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate('/')}>마이페이지</Layout.Header>
      <Layout.Main>
        <div className="flex flex-col">
          <MyPageProfile />
          <MyPageOrder />
          <MyPageOrderList />
        </div>
      </Layout.Main>
      <Layout.Footer>
        <Navigation active="my" />
      </Layout.Footer>
    </Layout>
  );
};

export default MyPage;
