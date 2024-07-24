import React, { useState } from 'react';
import classNames from 'classnames';
import Layout from '@/components/Layout';
import ongoingProducts from '@/mocks/data/ongoingData';
import upcomingProducts from '@/mocks/data/upcomingData';
import OngoingProduct from '@/components/product/OngoingProduct';
import UpcomingProduct from '@/components/product/UpcomingProduct';
import ProductButtons from '@/components/product/ProductButtons';

const ProductList = () => {
  const [activeTab, setActiveTab] = useState('ongoing');

  return (
    <Layout header="상품 경매 목록" footer={null}>
      <div className="flex justify-center w-full mt-3">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className={classNames(
            'flex justify-center items-center w-full py-2 ml-4 cursor-pointer text-sm',
            activeTab === 'ongoing'
              ? 'border-b-2 border-black'
              : 'border-b-2 border-gray-300',
          )}
          onClick={() => setActiveTab('ongoing')}
        >
          진행 중인 경매
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className={classNames(
            'flex justify-center w-full items-center py-2 mr-4 cursor-pointer text-sm',
            activeTab === 'upcoming'
              ? 'border-b-2 border-black'
              : 'border-b-2 border-gray-300',
          )}
          onClick={() => setActiveTab('upcoming')}
        >
          사전 등록 경매
        </div>
      </div>
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
