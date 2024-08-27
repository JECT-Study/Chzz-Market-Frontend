import { ProductListData, ProductListItem } from '@/@types/productList';
import { useEffect, useState } from 'react';

import Layout from '@/components/Layout';
import OngoingProduct from '@/components/product/OngoingProduct';
import ProductButtons from '@/components/product/ProductButtons';
import ProductListTabs from '@/components/product/ProductListTabs';
import UpcomingProduct from '@/components/product/UpcomingProduct';
import { useNavigate } from 'react-router-dom';
import useProductList from '@/hooks/useProductList';

const ProductList = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [sortType, setSortType] = useState('newest');
  const navigate = useNavigate();
  const [sortedOngoingProducts, setSortedOngoingProducts] =
    useState<ProductListItem[]>();
  const {
    ongoingData,
    upcomingData,
    fetchNextOngoingPage,
    fetchNextUpcomingPage,
  } = useProductList(activeTab, sortType);

  useEffect(() => {
    if (ongoingData) {
      const sortedProducts = ongoingData.pages.map((page: ProductListData) => {
        const itemsCopy = [...page.items];
        switch (sortType) {
          case 'popularity':
            return itemsCopy.sort(
              (a, b) => b.participantCount - a.participantCount,
            );
          case 'cheap':
            return itemsCopy.sort((a, b) => a.minPrice - b.minPrice);
          case 'expensive':
            return itemsCopy.sort((a, b) => b.minPrice - a.minPrice);
          case 'newest':
            return itemsCopy.sort((a, b) => b.timeRemaining - a.timeRemaining);
          case 'all':
            return itemsCopy;
          default:
            return itemsCopy;
        }
        // return itemsCopy; // 정렬 서버에서 정리, 클라이언트에서 사용할때 제거 서버에서 사용할때 위에 switch문 제거
      });
      const flatProducts = sortedProducts?.flat();
      setSortedOngoingProducts(flatProducts);
    }
  }, [ongoingData, sortType]);

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate('/')}>
        상품 경매 목록
      </Layout.Header>
      <Layout.Main style={{ paddingLeft: 0, paddingRight: 0 }}>
        <ProductListTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <ProductButtons setSortType={setSortType} />
        <div className="grid grid-cols-2 gap-4 p-4 h-[calc(100vh-100px)] overflow-y-auto">
          {activeTab === 'ongoing'
            ? sortedOngoingProducts?.map((product: ProductListItem) => (
                <OngoingProduct key={product.id} product={product} />
              ))
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
      </Layout.Main>
    </Layout>
  );
};

export default ProductList;
