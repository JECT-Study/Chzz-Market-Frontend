import { MyAuctionData } from '@/@types/myAuctionData';
import OrderProduct, {
  OrderProductProps,
} from '@/components/order/OrderProduct';

import AllOrderTab from '@/components/mypage/AllOrderTab';
import Layout from '@/components/Layout';
import Navigation from '@/components/Navigation';
import useMyAuction from '@/hooks/useMyAuction';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AllOrderList = () => {
  const [activeTab, setActiveTab] = useState(true);
  const navigate = useNavigate();

  const { myAuctionData, fetchNextOngoingPage } = useMyAuction();

  const ongoingContent =
    myAuctionData?.pages.flatMap((page: MyAuctionData) => page.content) || [];

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate('/')}>마이페이지</Layout.Header>
      <Layout.Main>
        <AllOrderTab activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="p-4 h-[calc(100vh-100px)] overflow-y-auto">
          {activeTab ? (
            ongoingContent.map((content: OrderProductProps) => (
              <OrderProduct key={content.id} product={content} />
            ))
          ) : (
            <div>a</div>
          )}
          <button
            className="w-20 h-20"
            onClick={() => {
              if (activeTab) {
                fetchNextOngoingPage();
              } else {
                // fetchNextUpcomingPage();
              }
            }}
          >
            더보기
          </button>
        </div>
      </Layout.Main>
      <Layout.Footer>
        <Navigation active="my" />
      </Layout.Footer>
    </Layout>
  );
};

export default AllOrderList;
