import {
  OngoingAuctionListItem,
  PreEnrollProductListItem,
} from '@/@types/productList';
import { useCallback, useEffect, useRef, useState } from 'react';
import Layout from '@/components/layout/Layout';
import OngoingProduct from '@/components/productList/OngoingProduct';
import ProductButtons from '@/components/productList/ProductButtons';
import ProductListTabs from '@/components/productList/ProductListTabs';
import { useNavigate } from 'react-router-dom';
import useProductList from '@/hooks/useProductList';
import PreEnrollProduct from '@/components/productList/PreEnrollProduct';

const ProductList = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [sortType, setSortType] = useState('newest');
  const navigate = useNavigate();
  const loader = useRef(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const {
    ongoingData,
    enrollData,
    fetchNextOngoingPage,
    fetchNextEnrollPage,
    hasNextOngoingPage,
    hasNextEnrollPage,
    refetchOngoingData,
    refetchEnrollData,
  } = useProductList(activeTab, sortType);

  const ongoingItems = ongoingData?.pages[0]?.items || [];
  const enrollItems = enrollData?.pages[0]?.items || [];

  const handleObserver = useCallback(
    (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting) {
        if (hasNextOngoingPage) {
          fetchNextOngoingPage();
        }
        if (hasNextEnrollPage) {
          fetchNextEnrollPage();
        }
      }
    },
    [
      fetchNextOngoingPage,
      fetchNextEnrollPage,
      hasNextOngoingPage,
      hasNextEnrollPage,
    ],
  );

  useEffect(() => {
    const options = {
      root: mainContainerRef.current,
      rootMargin: '0px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [fetchNextOngoingPage, hasNextOngoingPage, handleObserver]);

  useEffect(() => {
    if (activeTab === 'ongoing') {
      refetchOngoingData();
    } else {
      refetchEnrollData();
    }
  }, [activeTab, refetchOngoingData, refetchEnrollData]);

  return (
    <Layout>
      <Layout.Header title="상품 경매 목록" handleBack={() => navigate('/')} />
      <Layout.Main
        style={{ paddingLeft: 0, paddingRight: 0 }}
        ref={mainContainerRef}
      >
        <ProductListTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <ProductButtons setSortType={setSortType} />
        <div className="grid grid-cols-2 gap-4 p-4 h-[calc(100vh-100px)] overflow-y-auto">
          {activeTab === 'ongoing'
            ? ongoingItems?.map((product: OngoingAuctionListItem) => (
                <OngoingProduct key={product.id} product={product} />
              ))
            : enrollItems?.map((product: PreEnrollProductListItem) => (
                <PreEnrollProduct key={product.id} product={product} />
              ))}
          <div ref={loader} />
        </div>
      </Layout.Main>
    </Layout>
  );
};

export default ProductList;
