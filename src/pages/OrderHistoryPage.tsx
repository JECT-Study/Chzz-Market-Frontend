import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import OrderListTab from '@/components/order/OrderListTab';
import OrderProduct from '@/components/order/OrderProduct';
import ongoingProducts from '@/mocks/data/ongoingData';
import { useState } from 'react';

const OrderHistoryFooter = (
  <Footer>
    <nav className="flex items-center h-full">
      <div className="flex justify-center items-center w-[11.25rem] h-[3.75rem]">
        <img
          src="/home_off.svg"
          alt="homeOff"
          className="cursor-pointer size-7"
        />
      </div>
      <div className="flex justify-center items-center w-[11.25rem] h-[3.75rem]">
        <img
          src="/notice_off.svg"
          alt="noticeOff"
          className="cursor-pointer size-7"
        />
      </div>
      <div className="flex justify-center items-center w-[11.25rem] h-[3.75rem]">
        <img
          src="/heart_off.svg"
          alt="heartOn"
          className="cursor-pointer size-7"
        />
      </div>
      <div className="flex justify-center items-center w-[11.25rem] h-[3.75rem]">
        <img src="/my_on.svg" alt="myOn" className="cursor-pointer size-7" />
      </div>
    </nav>
  </Footer>
);

const OrderHistoryPage = () => {
  const [activeTab, setActiveTab] = useState('joinedAuctions');

  return (
    <Layout
      header={<Header path="/">모든 참여 내역</Header>}
      footer={OrderHistoryFooter}
    >
      <OrderListTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'joinedAuctions' &&
        ongoingProducts.map((product) => (
          <OrderProduct key={product.id} product={product} />
        ))}
      {activeTab === 'successfulAuctions' && <div />}
      {activeTab === 'failedAuctions' && <div />}
      {activeTab === 'closedAuctions' && <div />}
    </Layout>
  );
};

export default OrderHistoryPage;
