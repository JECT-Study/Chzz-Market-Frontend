import type { PreRegisterProduct, Product } from 'Product';
import {
  useGetBestProducts,
  useGetImminentProducts,
  useGetPreRegisterProducts,
  useRefreshTokenOnSuccess,
} from '@/components/home/queries';

import CategoryList from '@/components/home/CategoryList';
import HomeItemList from '@/components/home/HomeItemList';
import HomeProductItem from '@/components/home/HomeProductItem';
import HomeRegisterBtn from '@/components/home/HomeRegisterBtn';
import { useScrollDetection } from '@/hooks/useScrollDetection';
import { useEffect } from 'react';
import { useNavigationContext } from '@/components/navigation/NavigationContext';

const Home = () => {
  const { isScrolled, elementRef } = useScrollDetection(0);
  const { handleNavigationState } = useNavigationContext();
  useRefreshTokenOnSuccess();

  const { isBestLoading, bestProducts } = useGetBestProducts();
  const { isImminentLoading, imminentProducts } = useGetImminentProducts();
  const { isPreRegisterLoading, preRegisterProducts } =
    useGetPreRegisterProducts();

  const loadingState =
    isBestLoading || isImminentLoading || isPreRegisterLoading;

  useEffect(() => {
    handleNavigationState({ title: '치즈 마켓', active: 'home' });
  }, [handleNavigationState]);
  if (loadingState) return <div>Loading...</div>;

  return (
    <div
      ref={elementRef}
      role="main"
      aria-label="main_area"
      className="relative flex flex-col w-full gap-6 overflow-y-scroll"
    >
      <HomeItemList name="베스트 경매">
        {bestProducts?.map((product: Product, idx) => (
          <HomeProductItem
            key={product.id}
            kind="best"
            product={product}
            idx={idx}
          />
        ))}
      </HomeItemList>
      <HomeItemList name="종료 임박 경매">
        {imminentProducts?.map((product: Product, idx) => (
          <HomeProductItem
            key={product.id}
            kind="imminent"
            product={product}
            idx={idx}
          />
        ))}
      </HomeItemList>
      <HomeItemList name="카테고리">
        <CategoryList />
      </HomeItemList>
      <HomeItemList name="사전 등록 경매">
        {preRegisterProducts?.map((product: PreRegisterProduct, idx) => (
          <HomeProductItem
            key={product.id}
            kind="pre-register"
            product={product}
            idx={idx}
          />
        ))}
      </HomeItemList>
      <HomeRegisterBtn isScrolled={isScrolled} />
    </div>
  );
};

export default Home;
