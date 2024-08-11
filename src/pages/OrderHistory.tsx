import Layout from '@/components/Layout';
import Navigation from '@/components/Navigation';
import OrderListTab from '@/components/order/OrderListTab';
import OrderProduct from '@/components/order/OrderProduct';
import ongoingProducts from '@/mocks/data/ongoingData';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState('joinedAuctions');
  const navigate = useNavigate();

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate('/')}>
        모든 참여 내역
      </Layout.Header>
      <Layout.Main>
        <OrderListTab activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'joinedAuctions' &&
          ongoingProducts.map((product) => (
            <OrderProduct key={product.id} product={product} />
          ))}
        {activeTab === 'successfulAuctions' && <div />}
        {activeTab === 'failedAuctions' && <div />}
        {activeTab === 'closedAuctions' && <div />}
      </Layout.Main>
      <Layout.Footer>
        <Navigation active="my" />
      </Layout.Footer>
    </Layout>
  );
};

export default OrderHistory;