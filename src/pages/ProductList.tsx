import {
  OngoingProductListData,
  OngoingProductListItem,
  PreEnrollProductListData,
  PreEnrollProductListItem,
} from '@/@types/productList';
import { useCallback, useEffect, useRef, useState } from 'react';
import Layout from '@/components/Layout';
import OngoingProduct from '@/components/product/OngoingProduct';
import ProductButtons from '@/components/product/ProductButtons';
import ProductListTabs from '@/components/product/ProductListTabs';
import { useNavigate } from 'react-router-dom';
import useProductList from '@/hooks/useProductList';
import PreEnrollProduct from '@/components/product/PreEnrollProduct';

const ProductList = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [sortType, setSortType] = useState('newest');
  const navigate = useNavigate();
  const [sortedOngoingProducts, setSortedOngoingProducts] =
    useState<OngoingProductListItem[]>();
  const loader = useRef(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const {
    ongoingData,
    enrollData,
    fetchNextOngoingPage,
    fetchNextEnrollPage,
    hasNextOngoingPage,
    hasNextEnrollPage,
  } = useProductList(activeTab, sortType);

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

    if (ongoingData) {
      const sortedProducts = ongoingData.pages.map(
        (page: OngoingProductListData) => {
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
              return itemsCopy.sort(
                (a, b) => b.timeRemaining - a.timeRemaining,
              );
            case 'all':
              return itemsCopy;
            default:
              return itemsCopy;
          }
          // return itemsCopy; // 정렬 서버에서 정리, 클라이언트에서 사용할때 제거 서버에서 사용할때 위에 switch문 제거
        },
      );
      const flatProducts = sortedProducts?.flat();
      setSortedOngoingProducts(flatProducts);
    }
    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [
    fetchNextOngoingPage,
    hasNextOngoingPage,
    ongoingData,
    sortType,
    handleObserver,
  ]);

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate('/')}>
        상품 경매 목록
      </Layout.Header>
      <Layout.Main
        style={{ paddingLeft: 0, paddingRight: 0 }}
        ref={mainContainerRef}
      >
        <ProductListTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <ProductButtons setSortType={setSortType} />
        <div className="grid grid-cols-2 gap-4 p-4 h-[calc(100vh-100px)] overflow-y-auto">
          {activeTab === 'ongoing'
            ? sortedOngoingProducts?.map((product: OngoingProductListItem) => (
                <OngoingProduct key={product.id} product={product} />
              ))
            : enrollData?.pages.map((page: PreEnrollProductListData) =>
                page.items.map((product: PreEnrollProductListItem) => (
                  <PreEnrollProduct key={product.id} product={product} />
                )),
              )}
          <div ref={loader} />
        </div>
      </Layout.Main>
    </Layout>
  );
};

export default ProductList;
