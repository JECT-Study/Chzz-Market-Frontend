import { useState } from 'react';
import Layout from '@/components/Layout';
import ongoingProducts from '@/mocks/data/ongoingData';
import upcomingProducts from '@/mocks/data/upcomingData';
import OngoingProduct from '@/components/product/OngoingProduct';
import UpcomingProduct from '@/components/product/UpcomingProduct';
import ProductButtons from '@/components/product/ProductButtons';
import ProductListTabs from '@/components/product/ProductListTabs';
import Header from '@/components/Header';

const ProductList = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  return (
    <Layout header={<Header>상품 경매 목록</Header>}>
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
