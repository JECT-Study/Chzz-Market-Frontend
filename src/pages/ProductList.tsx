import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import OngoingProduct from '@/components/product/OngoingProduct';
import ProductButtons from '@/components/product/ProductButtons';
import ProductListTabs from '@/components/product/ProductListTabs';
import { useNavigate } from 'react-router-dom';
import useProductList from '@/hooks/useProductList';
import UpcomingProduct from '@/components/product/UpcomingProduct';
import { ProductListData, ProductListItem } from '@/models/productList';

const ProductList = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const navigate = useNavigate();
  const {
    ongoingData,
    upcomingData,
    fetchNextOngoingPage,
    fetchNextUpcomingPage,
  } = useProductList(activeTab);

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate('/')}>
        상품 경매 목록
      </Layout.Header>
      <ProductListTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <ProductButtons />
      <div className="p-4 h-[calc(100vh-100px)] overflow-y-auto">
        {activeTab === 'ongoing'
          ? ongoingData?.pages.map((page: ProductListData) =>
              page.items.map((product: ProductListItem) => (
                <OngoingProduct key={product.id} product={product} />
              )),
            )
          : upcomingData?.pages.map((page: ProductListData) =>
              page.items.map((product: ProductListItem) => (
                <UpcomingProduct key={product.id} product={product} />
              )),
            )}
        <button
          className="w-20 h-20"
          onClick={() => {
            if (activeTab === 'ongoing') {
              fetchNextOngoingPage();
            } else {
              fetchNextUpcomingPage();
            }
          }}
        >
          더보기
        </button>
      </div>
    </Layout>
  );
};

export default ProductList;
