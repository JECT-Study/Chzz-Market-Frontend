import AllOrderTab from '@/components/mypage/AllOrderTab';
import Layout from '@/components/Layout';
import Navigation from '@/components/Navigation';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AllOrderList = () => {
  const [activeTab, setActiveTab] = useState(true);
  const navigate = useNavigate();

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate('/')}>마이페이지</Layout.Header>
      <Layout.Main>
        <AllOrderTab activeTab={activeTab} setActiveTab={setActiveTab} />
      </Layout.Main>
      <Layout.Footer>
        <Navigation active="my" />
      </Layout.Footer>
    </Layout>
  );
};

export default AllOrderList;
