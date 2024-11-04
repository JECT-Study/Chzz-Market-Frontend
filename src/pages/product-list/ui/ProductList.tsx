import type { IAuctionItem, IPreAuctionItem } from '@/@types/AuctionItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { Layout } from '@/app/layout/index';
import OngoingProduct from '@/components/productList/OngoingProduct';
import PreAuctionProduct from '@/components/productList/PreAuctionProduct';
import ProductButtons from '@/components/productList/ProductButtons';
import ProductListTabs from '@/components/productList/ProductListTabs';
import useProductList from '@/hooks/useProductList';

export const ProductList = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [ongoingSortType, setOngoingSortType] = useState('newest');
  const [preAuctionSortType, setPreAuctionSortType] = useState('product-newest');
  const navigate = useNavigate();
  const location = useLocation();
  const categoryName = location.state.category;
  const loader = useRef(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';

  const { ongoingData, enrollData, fetchNextOngoingPage, fetchNextEnrollPage, hasNextOngoingPage, hasNextEnrollPage, refetchOngoingData, refetchEnrollData } =
    useProductList(activeTab, ongoingSortType, preAuctionSortType, category);

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
    [fetchNextOngoingPage, fetchNextEnrollPage, hasNextOngoingPage, hasNextEnrollPage]
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
      <Layout.Header title={`${categoryName} 경매 목록`} handleBack={() => navigate('/')} />
      <Layout.Main style={{ paddingLeft: 0, paddingRight: 0 }} ref={mainContainerRef}>
        <ProductListTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <ProductButtons setOngoingSortType={setOngoingSortType} setPreAuctionSortType={setPreAuctionSortType} />
        {activeTab === 'ongoing'
          ?
          <div className='grid grid-cols-2 gap-6 p-4 overflow-y-auto'>
            {ongoingItems?.map((product: IAuctionItem) => <OngoingProduct key={product.auctionId} product={product} />)}
          </div>
          :

          <div className='grid grid-cols-2 gap-6 p-4 overflow-y-auto'>
            {enrollItems?.map((product: IPreAuctionItem) => <PreAuctionProduct key={product.productId} product={product} />)}
          </div>
        }
        <div ref={loader} />
      </Layout.Main>
    </Layout>
  );
};