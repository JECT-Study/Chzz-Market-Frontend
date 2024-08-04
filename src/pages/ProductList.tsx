import { useState } from 'react';
import Layout from '@/components/Layout';
import ongoingProducts from '@/mocks/data/ongoingData';
import upcomingProducts from '@/mocks/data/upcomingData';
import OngoingProduct from '@/components/product/OngoingProduct';
import UpcomingProduct from '@/components/product/UpcomingProduct';
import ProductButtons from '@/components/product/ProductButtons';
import ProductListTabs from '@/components/product/ProductListTabs';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const navigate = useNavigate();
  return (
    <Layout>
      <Layout.Header handleBack={() => navigate('/')}>
        상품 경매 목록
      </Layout.Header>
      <ProductListTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <ProductButtons />
      <div className="p-4 h-[calc(100vh-100px)] overflow-y-auto">
        {activeTab === 'ongoing'
          ? ongoingProducts.map((product) => (
              <OngoingProduct key={product.id} product={product} />
            ))
          : upcomingProducts.map((product) => (
              <UpcomingProduct key={product.id} product={product} />
            ))}
      </div>
    </Layout>
  );
};

export default ProductList;
